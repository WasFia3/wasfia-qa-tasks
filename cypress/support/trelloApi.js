// Helper around the Trello REST API (https://developer.atlassian.com/cloud/trello/rest)
// Used to prepare test data (boards / lists / cards) so the UI tests stay focused
// on the behaviour under test.

const API_BASE = 'https://api.trello.com/1';

function authParams() {
  return {
    key: Cypress.env('TRELLO_KEY'),
    token: Cypress.env('TRELLO_TOKEN'),
  };
}

// Creates a board without default lists, then adds our own lists in order.
// Yields { id, shortUrl, lists: { [listName]: listId } }
export function createBoard(name, listNames = ['To Do', 'Doing', 'Done']) {
  return cy
    .request({
      method: 'POST',
      url: `${API_BASE}/boards/`,
      qs: { ...authParams(), name, defaultLists: false },
    })
    .then(({ body: board }) => {
      const lists = {};
      // Create the lists one after the other so their order is stable
      const addList = (index) => {
        if (index >= listNames.length) {
          return cy.wrap({ id: board.id, shortUrl: board.shortUrl, lists }, { log: false });
        }
        return cy
          .request({
            method: 'POST',
            url: `${API_BASE}/lists`,
            qs: { ...authParams(), name: listNames[index], idBoard: board.id, pos: 'bottom' },
          })
          .then(({ body: list }) => {
            lists[list.name] = list.id;
            return addList(index + 1);
          });
      };
      return addList(0);
    });
}

// Creates a normal card in the given list
export function createCard(listId, name) {
  return cy.request({
    method: 'POST',
    url: `${API_BASE}/cards`,
    qs: { ...authParams(), idList: listId, name },
  });
}

// Creates a template card in the given list (isTemplate flag)
export function createTemplateCard(listId, name) {
  return createCard(listId, name).then(({ body: card }) =>
    cy.request({
      method: 'PUT',
      url: `${API_BASE}/cards/${card.id}`,
      qs: { ...authParams(), isTemplate: true },
    })
  );
}

// Deletes a board (cleanup)
export function deleteBoard(boardId) {
  return cy.request({
    method: 'DELETE',
    url: `${API_BASE}/boards/${boardId}`,
    qs: authParams(),
  });
}

// Returns all cards on a board (used for API-level assertions)
export function getBoardCards(boardId) {
  return cy.request({
    method: 'GET',
    url: `${API_BASE}/boards/${boardId}/cards/all`,
    qs: authParams(),
  });
}

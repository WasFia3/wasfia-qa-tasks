# Task 4 - API Test Final (Postman)

Postman API tests for Trello's **Create Checklist in Card** endpoint.

## What's inside

```
task4-postman-api-test/
├── postman/
│   ├── Trello-Checklist-API.postman_collection.json   # the collection - import this
│   └── Trello.postman_environment.json.example        # environment template - copy & fill in
└── README.md
```

## What the collection does

- **Request**: `POST {{baseUrl}}/1/cards/{{CARD_ID}}/checklists` — creates a checklist on a
  Trello card. The checklist name is taken from a **collection variable** called `ChecklistName`.
- **Tests** (run automatically on every request via a collection-level test script):
  1. Status code is `200`
  2. Response is JSON
  3. The `name` field in the response matches the current `ChecklistName` collection variable
  4. The checklist's `idCard` matches the `CARD_ID` environment variable
  5. The response has an `id` and an (empty) `checkItems` array
- **`ChecklistName` reused with different values**: a folder called
  **"Different ChecklistName Examples"** contains 3 requests that each set
  `ChecklistName` to a different value (`Sprint Backlog`, `Bug Tracking`,
  `Release Checklist`) in a pre-request script before hitting the same endpoint — showing the
  same collection variable driving different test runs.

This was verified end-to-end against a live, temporary Trello card via Newman
(`npx newman run ...`): 4 requests, 20/20 assertions passing.

## Setup (do this before recording)

1. **Get your Trello API key & token**: https://trello.com/power-ups/admin →
   create/open a Power-Up → **API Key** → **Token**. (If you already generated one for the
   Trello Cypress task, you can reuse it — it's the `TRELLO_KEY` / `TRELLO_TOKEN` from that
   task's `cypress.env.json`.)
2. **Get a card ID**: open any Trello card in the browser and copy the short ID from the URL,
   e.g. `https://trello.com/c/AbCd1234/...` → the ID is `AbCd1234` (Trello accepts the
   shortLink anywhere it expects `idCard`).
3. In Postman:
   - **Import** → `postman/Trello-Checklist-API.postman_collection.json`
   - Duplicate `postman/Trello.postman_environment.json.example` as
     `Trello.postman_environment.json` (git-ignored, so your real key/token never get committed)
     and fill in `TRELLO_KEY`, `TRELLO_TOKEN`, `CARD_ID` — or just create a new environment in
     the Postman UI with those 4 variables (`baseUrl`, `TRELLO_KEY`, `TRELLO_TOKEN`, `CARD_ID`).
   - **Import** that environment too, then select it from the environment dropdown (top right).

> ⚠️ Never commit a Postman environment file that has your real API key/token filled in.

## What to record

1. Show the collection in Postman: the **"Create Checklist in Card"** request, its Tests tab,
   and the collection variable `ChecklistName` (Collection → ... → Edit → Variables tab).
2. Send **"Create Checklist in Card"** → show the response (200, JSON with the checklist) and
   the **Test Results** tab (all green).
3. Open the **collection variable** `ChecklistName`, change its value manually to something new,
   hit **Send** again → tests still pass, now validating the *new* name — this demonstrates the
   variable being reused with different names.
4. Open the **"Different ChecklistName Examples"** folder and run each of the 3 requests (or use
   **Collection Runner** to run the whole folder in one go) → show all passing with 3 different
   checklist names created on the same card.
5. (Optional) Open the card in Trello in a browser tab to show the checklists were actually
   created.

## Running headless (optional, e.g. with Newman)

```bash
npx newman run postman/Trello-Checklist-API.postman_collection.json \
  -e postman/Trello.postman_environment.json
```

# Final Task – Trello Test Cases (Cypress + Cucumber + POM)

**Website under test:** https://trello.com
**Requirements covered:**

| Req # | Requirement Description |
|-------|--------------------------------------------------|
| R_0 | User Can Delete Existing Card |
| R_1 | User Can Create New Template "Card Template" |
| R_2 | User Can Update Name Of Template |
| R_3 | User Can Move Template To Any List |
| R_4 | User Can Hide Template From List |

**Common precondition for all test cases:** User is logged in to Trello and a board
named "Wasfia Final Task Board" exists with the lists **To Do / Doing / Done**
(created through the Trello REST API before every scenario).

---

## Smoke Test Cases

Smoke = the critical happy-path checks that must always pass before any deeper testing.

| TC ID | Req | Title | Steps | Expected Result | Automated |
|-------|-----|-------|-------|-----------------|-----------|
| TC_R0_01 | R_0 | Delete an existing card | 1. Open the board 2. Open the card "Card To Delete" 3. Click **Archive** 4. Click **Delete** 5. Confirm deletion | Card is permanently removed and no longer visible anywhere on the board | ✅ `R0_delete_card.feature` |
| TC_R1_01 | R_1 | Create a new card template | 1. Open the board 2. In list "To Do" click the **Create from template** icon 3. Click **Create a new template** 4. Type "Card Template" 5. Click **Add card** | A template card named "Card Template" appears in the list "To Do" with a template badge | ✅ `R1_create_card_template.feature` |

## Regression Test Cases

Regression = the full suite (includes the smoke cases above plus the deeper checks below).

| TC ID | Req | Title | Steps | Expected Result | Automated |
|-------|-----|-------|-------|-----------------|-----------|
| TC_R0_01 | R_0 | Delete an existing card | (see smoke table) | Card permanently removed | ✅ |
| TC_R1_01 | R_1 | Create a new card template | (see smoke table) | Template created in list | ✅ |
| TC_R2_01 | R_2 | Update the name of a template | 1. Open the board 2. Open the template card "Card Template" 3. Click the title and replace it with "Card Template Updated" 4. Press Enter and close the card | The template is shown in the list with the new name "Card Template Updated" | ✅ `R2_update_template_name.feature` |
| TC_R3_01 | R_3 | Move a template to another list | 1. Open the board 2. Open the template card "Card Template" (in "To Do") 3. Click **Move** 4. Select list "Done" 5. Confirm the move and close the card | The template card now appears in list "Done" and no longer in "To Do" | ✅ `R3_move_template_to_list.feature` |
| TC_R4_01 | R_4 | Hide a template from its list | 1. Open the board 2. Open the template card "Card Template" 3. Click **Hide from list** | The template card is no longer visible in the list (but still exists as a template) | ✅ `R4_hide_template_from_list.feature` |
| TC_R0_02 | R_0 | Cancel a card deletion | 1. Open the card 2. Archive it 3. Click **Delete** 4. Dismiss the confirmation popover (Esc) | Card is NOT deleted, it stays archived and can be restored | Manual |
| TC_R2_02 | R_2 | Rename template to an empty name | 1. Open the template card 2. Clear the title 3. Press Enter | Empty name is rejected — the previous template name is kept | Manual |
| TC_R3_02 | R_3 | Move template to the same list | 1. Open the template card in "To Do" 2. Click **Move** 3. Choose the same list "To Do" | Template stays in "To Do" without duplication | Manual |

---

## Part 2 – Full Page Screenshot (10 points)

Inside the R_0 scenario, right after the board is opened, a **full page screenshot**
is taken and saved to the custom screenshots folder:

- Folder: `cypress/TrelloScreenshots/`
- File: `R0_delete_card.feature/R0-board-full-page.png`
- Implementation: `boardPage.takeFullPageScreenshot()` → `cy.screenshot(name, { capture: 'fullPage' })`

## How the suites are executed

```bash
npm run test:smoke        # runs only the scenarios tagged @smoke
npm run test:regression   # runs the full suite tagged @regression
```

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BUTTON_COLUMNS = 6;
exports.DEFAULT_BUTTON_ROWS = 10;
function getRowsOfButtons(buttons, columns = exports.DEFAULT_BUTTON_COLUMNS, maxRows = exports.DEFAULT_BUTTON_ROWS, page = 1) {
    const buttonsPerPage = maximumButtonsPerPage(columns, maxRows);
    const totalPages = Math.ceil(buttons.length / buttonsPerPage);
    const selectedPage = Math.max(Math.min(page, totalPages), 1);
    const pageOffset = (selectedPage - 1) * maxRows * columns;
    const maxButtonsToShow = Math.min(buttonsPerPage, buttons.length - pageOffset);
    const rows = [];
    for (let i = pageOffset; i < maxButtonsToShow + pageOffset; i += columns) {
        const slice = buttons.slice(i, i + columns);
        rows.push(slice);
    }
    return rows;
}
exports.getRowsOfButtons = getRowsOfButtons;
function maximumButtonsPerPage(columns = exports.DEFAULT_BUTTON_COLUMNS, maxRows = exports.DEFAULT_BUTTON_ROWS) {
    return columns * maxRows;
}
exports.maximumButtonsPerPage = maximumButtonsPerPage;
//# sourceMappingURL=align.js.map
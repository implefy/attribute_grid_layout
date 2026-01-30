/** @odoo-module **/

import { Component, useState, useRef, onMounted } from "@odoo/owl";

export class DefectPicker extends Component {
    static template = "attribute_grid_layout.DefectPicker";
    static props = {
        productImage: { type: String, optional: true },
        initialPositions: { type: Array, optional: true },
        onPositionsChange: { type: Function, optional: true },
        readonly: { type: Boolean, optional: true },
        gridRows: { type: Number, optional: true },
        gridCols: { type: Number, optional: true },
    };
    static defaultProps = {
        productImage: "",
        initialPositions: [],
        readonly: false,
        gridRows: 5,
        gridCols: 5,
    };

    setup() {
        this.state = useState({
            positions: [...(this.props.initialPositions || [])],
            activeCell: null,
            notePopupVisible: false,
            noteText: "",
        });
        this.noteInputRef = useRef("noteInput");

        onMounted(() => {
            if (this.noteInputRef.el) {
                this.noteInputRef.el.focus();
            }
        });
    }

    get gridCells() {
        const cells = [];
        for (let row = 0; row < this.props.gridRows; row++) {
            for (let col = 0; col < this.props.gridCols; col++) {
                const position = this.getPositionAt(col, row);
                cells.push({
                    x: col,
                    y: row,
                    label: this.getCellLabel(col, row),
                    isMarked: position !== null,
                    hasNotes: position?.notes ? true : false,
                    notes: position?.notes || "",
                });
            }
        }
        return cells;
    }

    get defectCount() {
        return this.state.positions.length;
    }

    get gridStyle() {
        return `grid-template-columns: repeat(${this.props.gridCols}, 1fr); grid-template-rows: repeat(${this.props.gridRows}, 1fr);`;
    }

    getCellLabel(x, y) {
        const col = String.fromCharCode(65 + x);
        return `${col}${y + 1}`;
    }

    getPositionAt(x, y) {
        return this.state.positions.find(p => p.x === x && p.y === y) || null;
    }

    onCellClick(cell) {
        if (this.props.readonly) {
            return;
        }

        const existingIndex = this.state.positions.findIndex(
            p => p.x === cell.x && p.y === cell.y
        );

        if (existingIndex >= 0) {
            // Cell is already marked - show note popup for editing
            this.state.activeCell = cell;
            this.state.noteText = this.state.positions[existingIndex].notes || "";
            this.state.notePopupVisible = true;
        } else {
            // Mark new cell
            this.state.positions.push({
                x: cell.x,
                y: cell.y,
                notes: "",
            });
            this.notifyChange();
        }
    }

    onCellRightClick(event, cell) {
        event.preventDefault();
        if (this.props.readonly) {
            return;
        }

        // Right-click removes the defect marker
        const existingIndex = this.state.positions.findIndex(
            p => p.x === cell.x && p.y === cell.y
        );
        if (existingIndex >= 0) {
            this.state.positions.splice(existingIndex, 1);
            this.notifyChange();
        }
    }

    onAddNote(cell) {
        if (this.props.readonly) {
            return;
        }
        const existingIndex = this.state.positions.findIndex(
            p => p.x === cell.x && p.y === cell.y
        );
        if (existingIndex >= 0) {
            this.state.activeCell = cell;
            this.state.noteText = this.state.positions[existingIndex].notes || "";
            this.state.notePopupVisible = true;
        }
    }

    closeNotePopup() {
        this.state.notePopupVisible = false;
        this.state.activeCell = null;
        this.state.noteText = "";
    }

    saveNote() {
        if (!this.state.activeCell) {
            return;
        }
        const existingIndex = this.state.positions.findIndex(
            p => p.x === this.state.activeCell.x && p.y === this.state.activeCell.y
        );
        if (existingIndex >= 0) {
            this.state.positions[existingIndex].notes = this.state.noteText;
            this.notifyChange();
        }
        this.closeNotePopup();
    }

    removeDefect() {
        if (!this.state.activeCell) {
            return;
        }
        const existingIndex = this.state.positions.findIndex(
            p => p.x === this.state.activeCell.x && p.y === this.state.activeCell.y
        );
        if (existingIndex >= 0) {
            this.state.positions.splice(existingIndex, 1);
            this.notifyChange();
        }
        this.closeNotePopup();
    }

    onNoteInputChange(event) {
        this.state.noteText = event.target.value;
    }

    onNoteKeydown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.saveNote();
        } else if (event.key === "Escape") {
            this.closeNotePopup();
        }
    }

    clearAll() {
        if (this.props.readonly) {
            return;
        }
        this.state.positions = [];
        this.notifyChange();
    }

    notifyChange() {
        if (this.props.onPositionsChange) {
            this.props.onPositionsChange([...this.state.positions]);
        }
    }
}

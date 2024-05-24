import React, { Component } from "react";
// CONSTANTS
import { ACTIONS } from "../constants";
// COMPONENTS
import TextInput, { NumericInput } from "../../Input/text-input";
import DropdownButton from "../../Buttons/DropdownBtn";
import ActiveElementControls from "./activeControls";

class Canvastools extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleJsonData = this.props.handleJsonData.bind(this);
  }

  deleteHandler(option) {
    if (option === "clear-page") {
      this.props.onChange(ACTIONS.CLEAR_PAGE);
    } else if (option === "selected-item") {
      this.props.onChange(ACTIONS.DELETE_SELECTION);
    }
  }

  render() {
    const {
      activeElementProps,
      showStyleEditor,
      onChange,
      elementIds,
      canvas,
      selectedElementName,
      elementsDropDownData,
      jsonRef,
      pageWidth,
      pageHeight,
      theme,
    } = this.props;
    const activeElementType = canvas?.getActiveObject()?.type;
    const activeElem = canvas.getActiveObject();
    return (
      <div className="DesignerConfigPanel">
        <input
          ref={jsonRef}
          className="hidden-file"
          type="file"
          accept="image/svg"
          onChange={this.handleJsonData}
        />{" "}
        <input
          ref={jsonRef}
          className="hidden-file"
          type="file"
          accept="image/svg"
          onChange={this.handleJsonData}
        />
        <div className="page-dimensions mt-10">
          <div className="page-dimensions-control">
            <NumericInput
              theme={theme}
              value={pageWidth}
              containerClass="cls number sm"
              label="Canvas Width"
              onChange={(val) => {
                if (val < 1920)
                  onChange(ACTIONS.CHANGE_PAGE_DIMENSIONS, {
                    name: "width",
                    val: Number(val),
                  });
                else {
                  onChange(ACTIONS.CHANGE_PAGE_DIMENSIONS, {
                    name: "width",
                    val: 1920,
                  });
                }
              }}
            />
            <NumericInput
              theme={theme}
              value={pageHeight}
              containerClass={"cls number sm"}
              label="Canvas Height"
              onChange={(val) => {
                if (val < 1080)
                  onChange(ACTIONS.CHANGE_PAGE_DIMENSIONS, {
                    name: "height",
                    val: Number(val),
                  });
                else {
                  onChange(ACTIONS.CHANGE_PAGE_DIMENSIONS, {
                    name: "height",
                    val: 1080,
                  });
                }
              }}
            />
            <NumericInput
              theme={theme}
              value={parseInt(activeElem?.width)}
              containerClass={"cls number "}
              label={"Item Width"}
              onChange={(val) => {
                activeElem.set({
                  width: Number(val),
                });
                canvas.renderAll();
              }}
            />
            <NumericInput
              theme={theme}
              value={parseInt(activeElem?.height)}
              containerClass={"cls number "}
              label={"Item Height"}
              onChange={(val) => {
                activeElem.set({
                  height: Number(val),
                });
                canvas.renderAll();
              }}
            />
          </div>
        </div>
        <div className="element-selector">
          <DropdownButton
            leftIcon={true}
            btnText={"Selected: " + selectedElementName}
            variant="light"
            buttons={elementsDropDownData}
            onDropBtnClick={(option) => {
              const selected = elementsDropDownData.find(
                (el) => el.value === option.value
              );
              onChange(ACTIONS.UPDATE_ACTIVE_ELEMENT, {
                id: selected?.value,
                name: selected?.name,
              });
            }}
          />
        </div>
        {activeElementType !== "activeSelection" &&
        activeElementType !== "polygon" &&
        activeElementType !== "textbox" ? (
          <div
            className="elementName"
            style={{
              width: "100%",
            }}
          >
            <TextInput
              theme={theme}
              style={{
                width: "100%",
                height: "31px",
              }}
              value={selectedElementName ? selectedElementName : ""}
              label="Element Name:"
              onChange={(el) => {
                const elem = canvas.getActiveObject();
                if (elem) {
                  elem.customName = true;
                  elem.changeName = el.target.value;
                  onChange(ACTIONS.ELEMENT_NAME, el);
                }
              }}
            />
          </div>
        ) : null}
        {showStyleEditor ? (
          <ActiveElementControls
            theme={theme}
            canvas={canvas}
            elementIds={elementIds}
            activeElementProps={activeElementProps}
            selectedElementName={selectedElementName}
            elementsDropDownData={elementsDropDownData}
            onActiveElementPropsChange={(props) => {
              onChange(ACTIONS.CHANGE_ACTIVE_ELEMENT_PROPS, props);
            }}
            onChange={(action, data) => {
              onChange(action, data);
            }}
          />
        ) : null}
      </div>
    );
  }
}

Canvastools.defaultProps = {
  elementsDropDownData: [],
};

export default Canvastools;

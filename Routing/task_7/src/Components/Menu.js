import React from "react";

export default function Menu(props) {

  
  return (
    <>
      {props.filedata.map((item) => {
        return (
          <div key={item.name}>
            <select
              type="number"
              className="arrows"
              onChange={(e) => {
                props.changestate(e.target.value);
              }}
            >
              <option key="None" value="None">
                None
              </option>
              {item.items &&
                item.items.map((iitem) => {
                  return (
                    <option key={iitem.name} value={iitem.name}>
                      {iitem.name}
                    </option>
                  );
                })}
            </select>
            <Menu filedata={item.items} changestate={props.changestate} />
          </div>
        );
      })}
    </>
  );
}

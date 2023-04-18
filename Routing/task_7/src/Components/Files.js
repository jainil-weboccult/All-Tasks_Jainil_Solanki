import React from "react";

export default function Files({ filedata }) {
  return (
    <div>
      <span>
        {filedata.map((item) => {
          return (
            <div key={item.id}>
              <dl>
                <ul>
                  <li>
                    <dt>{item.name}</dt>
                  </li>
                </ul>
                <dd>
                  <Files filedata={item.items} />
                </dd>
              </dl>
            </div>
          );
        })}
      </span>
    </div>
  );
}

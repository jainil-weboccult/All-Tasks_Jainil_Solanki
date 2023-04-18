export default function List({ level, parent, state }) {
  return (
    <>
      {state.nodeList.filter(
        (item) => item.parent === parent && item.level === level
      ).length ? (
        <ul>
            {
                state.nodeList.filter(
                    (item) => item.parent === parent && item.level === level
                  ).map((item) => {
                    return(
                        <li key={item.id} >{item.value} {state.nodeList.filter(
                            (item) => item.parent === parent && item.level === level
                          ).length ?
                          <List parent={item.id} level={level+1} state={state} />
                           : null} </li>
                    )
                  })         
            }
        </ul>
      ) : null}
    </>
  );
}

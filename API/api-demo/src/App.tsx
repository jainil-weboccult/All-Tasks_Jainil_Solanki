import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const token = source.token;

  const controller = new AbortController();
  const [data, setData] = useState<any>();
  const [user, setUser] = useState({ email: "", password: "" });
  // useEffect(() => {
  //   //Using FetchAPI
  //   // fetch("https://dummyjson.com/products/?limit=10")
  //   //   .then((res) => res.json())
  //   //   .then((json) => {
  //   //     setData(json);
  //   //   });
  //   // getData();
  //   // Using Axios
  //   axios
  //     .get("https://dummyjson.com/products/?limit=10", {
  //       signal: controller.signal,
  //     })
  //     .then((res) => setData(res.data));
  //   axios.get("https://reqres.in/api/users?page=2").then((response) => {
  //     setAnotherData(response.data.data);
  //   });
  // }, []);

  function getData() {
    setTimeout(async () => {
      const response = await axios.get(
        "https://dummyjson.com/products/?limit=10",
        { signal: controller.signal, cancelToken: source.token }
      );
      const { data } = response;

      setData(data);
    }, 2000);
  }

  // Using Async and Await
  async function getData2() {
    // const response = await fetch(
    //   "https://dummyjson.com/products/?limit=10&skip=10",
    //   { signal: controller.signal }
    // );
    // const data = await response.json();
    // setData(data);
    const response = await axios.get(
      "https://dummyjson.com/products/?limit=10&skip=10"
    );
    // source.cancel("Request Cancelled");
    const { data } = response;
    setData(data);
    controller.abort("Cancelled API Call");
  }

  const post: any = {
    title: "Sri Lankan Airways",
  };
  const put: any = {
    title: "WebOccult",
    brand: "My Brand",
    description: "My Description",
  };
  function Post() {
    axios
      .post("https://dummyjson.com/products/add", post)
      .then((res) => console.log("Post Data", res.data));
  }
  function Put() {
    axios
      .put("https://dummyjson.com/products/1", put)
      .then((res) => console.log("PUT Data", res.data));
  }

  function cancelCall() {}
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>API DEMO</h1>

        <div>
          <button onClick={() => getData()}>Call API 1</button>
          <button onClick={() => getData2()}>Call API 2</button>
          <button onClick={() => cancelCall()}>Cancel Call</button>
        </div>
      </div>
      <table
        border={1}
        style={{ borderCollapse: "collapse", marginBottom: "50px" }}
        className="table"
      >
        <thead>
          <tr>
            <td>Id</td>
            <td>Images</td>
            <td>Brand</td>
            <td>Category</td>
            <td>Description</td>
            <td>Title</td>
            <td>Price</td>
            <td>Rating</td>
            <td>Stock</td>
            <td>Discounted %</td>
          </tr>
        </thead>

        <tbody>
          {data ? (
            data.products.map((product: any, index: any) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={product.images[0]}
                      alt="Avatar"
                    />
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.stock}</td>
                  <td>{product.discountPercentage}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Loading ...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* 
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Your Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Your Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <button onClick={() => Login()}>Login</button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "200px",
          justifyContent: "center",
          margin: "auto",
          padding: "20px",
        }}
      >
        <button onClick={() => Post()}>Create Data Post</button>
        <button onClick={() => Put()}>Update Entire Data Put</button>
      </div>
    </div>
  );
}

export default App;

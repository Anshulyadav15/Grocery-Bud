import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import "./App.css";

function App() {
  const [grocery, setGrocery] = useState("");
  const [grocerylist, setGroceryList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [clear, setClear] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editedGrocery, setEditedGrocery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
      setClear(false);
      setEditAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert, clear, editAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing && editItemId) {
      setGroceryList((items) => {
        return items.map((item) =>
          item.id === editItemId ? { ...item, grocery: editedGrocery } : item
        );
      });
      setEditing(false);
      setEditItemId(null);
      setEditedGrocery("");
      setEditAlert(true);
    } else if (grocery) {
      const item = { id: new Date().getTime().toString(), grocery };
      setGroceryList((items) => {
        return [...items, item];
      });
      setGrocery("");
    } else {
      setAlert(true);
    }
  };

  const handleDelete = (id) => {
    const newgrocerylist = grocerylist.filter((remove) => remove.id !== id);
    setGroceryList(newgrocerylist);
    if (editing && editItemId === id) {
      setEditing(false);
      setEditItemId(null);
      setEditedGrocery("");
    }
  };

  const handleEdit = (id, grocery) => {
    setEditing(true);
    setEditItemId(id);
    setEditedGrocery(grocery);
  };

  return (
    <>
      <section className="container">
        {(alert || clear) && (
          <h4 style={{ backgroundColor: "#ff9083", letterSpacing: "1.2px"}}>
            {alert ? "Item removed" : "Empty List"}
          </h4>
        )}
        {editAlert && (
          <h4 style={{ backgroundColor: "#BDFF59", letterSpacing: "1.2px" }}>Item Edited</h4>
        )}
        <h3>Grocery Bud</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={editing ? editedGrocery : grocery}
            onChange={
              editing
                ? (e) => {
                    setEditedGrocery(e.target.value);
                  }
                : (e) => setGrocery(e.target.value)
            }
            placeholder="e.g.eggs"
          />
          <button className="btn">{editing ? "Edit" : "Submit"}</button>
        </form>

        <list/>

        <article className="container-grocery">
          {grocerylist.map((item) => {
            const { id, grocery } = item;
            return (
              <div key={id} className="grocery">
                <div className="f-left">
                  <p>{grocery}</p>
                </div>
                <div className="f-right">
                  <button className="btn-edit">
                    <BiEdit onClick={() => handleEdit(id, grocery)} />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      setAlert(true);
                      handleDelete(id);
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </article>

        {grocerylist.length > 0 && (
          <article className="btn-c">
            <button
              className="btn-clear"
              onClick={() => {
                setEditing(false);
                setClear(true);
                setGroceryList([]);
              }}
            >
              Clear All
            </button>
          </article>
        )}
      </section>
    </>
  );
}

export default App;

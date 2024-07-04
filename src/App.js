import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FirendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <buttom className="button" onClick={onClick}>
      {children}
    </buttom>
  );
}

function FirendsList() {
  const freinds = initialFriends;
  return (
    <ul>
      {freinds.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are equal</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend Name 👨🏾‍🤝‍👨🏼</label>
      <input type="text" />

      <label>Friend Image 🌆</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with Name</h2>

      <label>Bill Value 💵</label>
      <input type="text" />

      <label>Your expense 👦</label>
      <input type="text" />

      <label>Friend's expense 👨🏾‍🤝‍👨🏼</label>
      <input type="text" disabled />

      <label>Who is paying the bill 💰</label>
      <select>
        <option value="user"></option>
        <option value="friend"></option>
      </select>

      <Button>Add</Button>
    </form>
  );
}

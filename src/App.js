import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=2001521",
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
  const [freinds, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
    // setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...freinds, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FirendsList
          freinds={freinds}
          selectedFriend={selectedFriend}
          onSelect={handleSelection}
        />
        {showAddFriend && <FormAddFriend addFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FirendsList({ freinds, onSelect, selectedFriend }) {
  return (
    <ul>
      {freinds.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  //  selectedFriend?.id as an optional chaining;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const id = crypto.randomUUID(); // to generate a random ID
    const newFriend = {
      id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    addFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name 👨🏾‍🤝‍👨🏼</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Friend Image 🌆</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill Value 💵</label>
      <input type="text" />

      <label>Your expense 👦</label>
      <input type="text" />

      <label>{selectedFriend.name}'s expense 👨🏾‍🤝‍👨🏼</label>
      <input type="text" disabled />

      <label>Who is paying the bill 💰</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

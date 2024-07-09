import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Ahmed",
    image: "https://i.pravatar.cc/48?u=56wer2333r445",
    balance: -7,
  },
  {
    id: 933372,
    name: "Hema",
    image: "https://i.pravatar.cc/48?u=56445",
    balance: 20,
  },
  {
    id: 499476,
    name: "Medo",
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

  function handleSplitBill(val) {
    setFriends((friends) =>
      freinds.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + val }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <>
      <Header />
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
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  );
}

function Header() {
  return <h1 className="header">Bill Splitter</h1>;
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
          You owe {friend.name} {Math.abs(friend.balance)}
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [payByUser, setPayByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const payByFriend = bill ? bill - payByUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !payByUser) return;
    onSplitBill(whoIsPaying === "user" ? payByFriend : -payByUser);
    // setBill("");
    // setPayByUser("");
    // setWhoIsPaying("user");
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill Value 💵</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expense 👦</label>
      <input
        type="text"
        value={payByUser}
        onChange={(e) =>
          setPayByUser(
            Number(e.target.value) > bill ? payByUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expense 👨🏾‍🤝‍👨🏼</label>
      <input type="text" disabled value={payByFriend} />

      <label>Who is paying the bill 💰</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

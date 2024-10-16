import { useEffect, useState } from "react";
import axios from "axios";

// css
import "./App.css";

// components
import Header from "./components/Header";
import Group from "./components/Group";

// constants
import { PriorityLevels, ProgressLevels } from "./constants";

function App() {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [groups, setGroups] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") !== null
      ? parseInt(localStorage.getItem("grouping"))
      : 2
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") !== null
      ? parseInt(localStorage.getItem("ordering"))
      : 0
  );
  const [byPriority, setByPriority] = useState({});
  const [byUser, setByUser] = useState({});
  const [byStatus, setByStatus] = useState({});

  // Fetch API Data
  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        setUsers(res.data.users);

        const priorityMap = {};
        PriorityLevels.forEach((level) => {
          priorityMap[level] = [];
        });
        
        // Group tickets by priority
        res.data.tickets.forEach((ticket) => {
          const priority = PriorityLevels[ticket.priority];
          priorityMap[priority].push(ticket);
        });
        setByPriority(priorityMap);

        // Group tickets by user
        const userMap = res.data.tickets.reduce((acc, ticket) => {
          const userId =
            res.data.users[parseInt(ticket.userId.split("-")[1]) - 1].name;
          acc[userId] = acc[userId] || [];
          acc[userId].push(ticket);
          return acc;
        }, {});
        setByUser(userMap);

        // Group tickets by status
        const statusMap = {};
        ProgressLevels.forEach((level) => {
          statusMap[level] = [];
        });
        res.data.tickets.forEach((ticket) => {
          const status = ticket.status;
          statusMap[status].push(ticket);
        });
        setByStatus(statusMap);

        // Set initial groups based on the current grouping selection
        setGroups(grouping === 0 ? statusMap : grouping === 1 ? userMap : priorityMap);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
      });
  }, [grouping]);

  useEffect(() => {
    // Update groups based on the selected grouping method
    if (grouping === 0) {
      setGroups(byStatus);
    } else if (grouping === 1) {
      setGroups(byUser);
    } else if (grouping === 2) {
      setGroups(byPriority);
    }
  }, [grouping, byPriority, byUser, byStatus]);

  return (
    <div className="App">
      <Header grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
      {users.length === 0 ? ( 
        <p>Loading users...</p> // Display a loading state until users are available
      ) : (
        <main className="App__main">
          {Object.keys(groups).map((group, id) => (
            <Group 
              width={100 / Object.keys(groups).length} 
              key={id} 
              users={users} 
              name={group} 
              grouping={grouping} 
              ordering={ordering} 
              tasks={Object.values(groups)[id]} 
            />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;

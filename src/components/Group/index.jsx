import React from "react";
import Card from "../Card";
import "./Group.css";
import { IoMdAdd } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { priorityIcons, progressIcons } from "../Icons";
import Avatar from "../Avatar";

const Group = ({ tasks, name, width, users, grouping, ordering }) => {
  // Extract user IDs by parsing the `userId` field from each task
  const userIds = tasks.map(task => parseInt(task.userId.split("-")[1], 10) - 1);

  // Get initials from the group name, fallback to "I" if the name is not available
  const initials = name? name.split(" ").reduce((acc, word) => acc + word[0].toUpperCase(), ""): "I";


  // Sort tasks based on the ordering option
  if (ordering === 0) {
    tasks.sort((a, b) => b.priority - a.priority);
  } else if (ordering === 1) {
    tasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Find the user associated with the group, or use a default fallback user
  const groupUser = users.find(user => user.name === name) || {
    id: "usr-1",
    available: false,
  };

  const userId = parseInt(groupUser.id.split("-")[1], 10) - 1;

  return (
    <div className="Group" style={{ width: `${width}%` }}>
      <header className="Group__header">
        {/* Display progress, priority, or avatar icon based on the grouping */}
        {grouping === 0 && progressIcons(name)}
        {grouping === 1 && (
          <Avatar initial={initials} id={userId} available={groupUser.available} />
        )}
        {grouping === 2 && priorityIcons(name)}

        {/* Display group name and task count */}
        <span className="Group__name">{name}</span>
        <span className="Group__taskCount">{tasks.length}</span>

        {/* Action buttons */}
        <IoMdAdd className="Group__icon" />
        <IoEllipsisHorizontal className="Group__icon" />
      </header>

      {/* Render each task as a Card component */}
      {tasks.map((task, index) => (
        <Card
          key={index}
          grouping={grouping}
          user={users[userIds[index]]}
          data={task}
        />
      ))}
    </div>
  );
};

export default Group;

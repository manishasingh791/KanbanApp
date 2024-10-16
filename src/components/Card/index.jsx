import React from "react";
import "./Card.css";
import Tag from "../Tag";
import Avatar from "../Avatar";
import { priorityIcons, progressIcons } from "../Icons";

const Card = ({ data, user, grouping }) => {
  const { title, tag, id } = data;
  const name = user.name;
  const userId = parseInt(user.id.split("-")[1], 10) - 1;
  const initial = name? name.split(" ").map((n) => n[0].toUpperCase()).join(""): "initial";

  return (
    <div className="Card">
      <header className="Card__header">
        <span className="Card__id">{id}</span>
        {grouping !== 1 && (
          <Avatar initial={initial} available={user.available} id={userId} />
        )}
      </header>
      <section className="Card__content" style={{fontSize:"14px"}}>
        {grouping !== 0 && progressIcons(data.status)}
        <p className="Card__title">{title}</p>
      </section>
      <footer className="__footer">
        {grouping !== 2 && <span style={{fontSize:"14px"}}>{priorityIcons(data.priority)}</span>}
        {tag.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </footer>
    </div>
  );
};

export default Card;

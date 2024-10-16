import { TbAntennaBars3 } from "react-icons/tb";
import { TbAntennaBars4 } from "react-icons/tb";
import { TbAntennaBars5 } from "react-icons/tb";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import "./Icons.css"; // Import the external CSS file

import { FaRegCircle } from "react-icons/fa";
import { MdOutlineTonality } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { GoCircleSlash } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import "./Icons.css"; // Import the external CSS file

export const progressIcons = (progress) => {
  if (progress === "Todo") {
    return <FaRegCircle className="icon-muted" />;
  } else if (progress === "In progress") {
    return <MdOutlineTonality className="icon-warning" />;
  } else if (progress === "Done") {
    return <FaCircleCheck className="icon-complete" />;
  } else if (progress === "Backlog") {
    return <GoCircleSlash className="icon-muted" />;
  } else {
    return <MdCancel className="icon-muted" />;
  }
};

export const priorityIcons = (priority) => {
  if (priority === 0 || priority === "No Priority") {
    return <IoEllipsisHorizontal className="icon-default" />;
  } else if (priority === 1 || priority === "Low") {
    return <TbAntennaBars3 className="icon-default" />;
  } else if (priority === 2 || priority === "Medium") {
    return <TbAntennaBars4 className="icon-default" />;
  } else if (priority === 3 || priority === "High") {
    return <TbAntennaBars5 className="icon-default" />;
  } else {
    return <BsFillExclamationSquareFill className="icon-error" />;
  }
};

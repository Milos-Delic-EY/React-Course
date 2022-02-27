import classes from "./usersList.module.css";
import Card from "../../Ui/Card/Card";

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((e) => (
          <li key={e.id}>
            {e.name} ({e.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;

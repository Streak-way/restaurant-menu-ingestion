import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import firebase from "./firebase";

const RestMenuItems = ({ restId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const db = getFirestore(firebase);
  useEffect(() => {
    // get menu items from firestore
    const items = [];
    const fetchMenuItems = async () => {
      // get menu items for restId
      const menuRef = collection(db, "menu-items");
      const menus = await query(menuRef, where("restId", "==", restId));
      const menuSnapshot = await getDocs(menus);
      console.log("menuSnapshot", menuSnapshot);
      menuSnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMenuItems(items);
    };
    fetchMenuItems();
  }, [db, restId]);
  // restaurant menu items fields
  return menuItems.map((item) => {
    return (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <p>{item.categories}</p>
      </div>
    );
  });
};
export default RestMenuItems;

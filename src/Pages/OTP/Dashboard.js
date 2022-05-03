import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { otpRef, auth, db, logout } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onSnapshot, getDocs, query, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [otpCode, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {

      //get user_name
      const docRef = doc(db, "user-data", user?.uid);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().user_name);

      //get otp
      const otpQ = query(otpRef, where("email", "==", user?.email));
      // const querySnapshot = await getDocs(otpQ);
      // querySnapshot.forEach((doc) => {
      //   // console.log(doc.id, " => ", doc.data());
      //   setCode(doc.data().otp_code)
      // });
      const unsubscribe = onSnapshot(otpQ, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCode(doc.data().otp_code)
        });
        // console.log("Current cities in CA: ", cities.join(", "));
      });
    } catch (err) {
      console.error(err);
      alert("Login Failed, Please Re-login!");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData();
  }, [user, loading]);
  return (
        <div class="container">
          <div class="wrapper">
            <div class="title"><span>OTP Verification</span></div>
            <div class="box">
              <div class="row">
                <h3>Hello, {name}!</h3>
                <p>[Store] Verification Code: <b>{otpCode}</b>. valid for 1 Minute 30 Second, please beware of scam and don't give this code to anyone.</p>
              </div>
              <div class="button">
                <input
                  type="submit"
                  className="btn_Logout"
                  onClick={logout}
                  value="Logout"
                />
              </div>
            </div>
          </div>
        </div>
  );
}
export default Dashboard;
import React, { useRef, useState } from "react";

function SignUp() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileInputRef = useRef();
  let genderInputRef = useRef();
  let profielPicInputRef = useRef();

  let [profile, setProfile] = useState("./images/noImage.png");

  let SignUpForm = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let sendingData = {
      firstName: firstNameInputRef.current.value,
      lasttName: lastNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobile: mobileInputRef.current.value,
      gender: genderInputRef.current.value,
      profielPic: profielPicInputRef.current.value,
    };

    let reqMethod = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(sendingData),
    };

    let JSONData = await fetch("http://localhost:1947/register", reqMethod);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let SignUpUsingURLE = async () => {
    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);
    dataToSend.append("gender", genderInputRef.current.value);
    dataToSend.append("profilePic", profielPicInputRef.current.value);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let reqMethod = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:1947/register", reqMethod);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let SignUpUsingFormData = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);
    dataToSend.append("gender", genderInputRef.current.value);

    for (let i = 0; i < profielPicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profielPicInputRef.current.files[i]);
    }

    let reqMethod = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:1947/register", reqMethod);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile</label>
          <input ref={mobileInputRef}></input>
        </div>
        <div>
          <label>Gender</label>
          <input ref={genderInputRef}></input>
        </div>
        <div>
          <label>profiel Pic</label>
          <input
            type="file"
            accept="image/*"
            onChange={(eo) => {
              let selectedPicPath = URL.createObjectURL(eo.target.files[0]);
              setProfile(selectedPicPath);
            }}
            ref={profielPicInputRef}
          ></input>
          <br></br>
          <br></br>
          <br></br>
          <img src={profile}alt="" className="pic"></img>
        </div>

        <button
          type="button"
          onClick={() => {
            SignUpForm();
          }}
        >
          register
        </button>

        <button
          type="button"
          onClick={() => {
            SignUpUsingURLE();
          }}
        >
          URL encoded
        </button>

        <button
          type="button"
          onClick={() => {
            SignUpUsingFormData();
          }}
        >
          Form Data
        </button>
      </form>
    </div>
  );
}

export default SignUp;

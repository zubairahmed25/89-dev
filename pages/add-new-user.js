"use client";
import { useState } from "react";
import { PageLayout } from "../components/page-layout";

import { userService } from "../services/user.service";
import { useRouter } from "next/navigation";


const CreateUser = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function onSubmit() {
    return userService.register({firstName, lastName, username, password})
        .then(() => {
            console.log("success")
            router.push('/');
        })
        .catch(err => {
          console.log(err)
        });
}

  return (
    <form onSubmit={onSubmit}>
            <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Mongo DB Connection / POST record test
        </h1>
        <div className="content__body">
        <label>
      First Name:
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </label>
    <label>
      Last Name:
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </label>
        
        <label>
      Username:
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </label>
    <input type="submit" value="Submit" />
        </div>
      </div>
    </PageLayout>

  </form>
  );
};

export default CreateUser;


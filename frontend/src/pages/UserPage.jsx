// React
import { useState, useEffect } from "react";

// Navigation
import { useParams } from "react-router-dom";

// Components
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

// Hooks
import useShowToast from "../hooks/useShowToast";

// Redux toolkit Query
import { useGetUserQuery } from "../store/store";

function UserPage() {
  const [user, setUser] = useState(null);
  // Hooks
  const showToast = useShowToast();
  const { username } = useParams();

  // redux Toolkit Query
  const { data, error } = useGetUserQuery(username);

  useEffect(() => {
    if (data) setUser(data.user);
    else if (error) showToast("Error", error.data.message, "error");
  }, [showToast, error, data]);

  return (
    <>
      {user && (
        <>
          <UserHeader user={user} />
          <UserPost
            likes={1200}
            replies={481}
            postImg="/post1.png"
            postTitle="Let's talk about social."
          />
          <UserPost
            likes={451}
            replies={12}
            postImg="https://social-image-upload.s3.ap-south-1.amazonaws.com/84c2422607f438bca725bd79d8c76a24"
            postTitle="Nice tutorial."
          />
          <UserPost
            likes={321}
            replies={989}
            postImg="https://social-image-upload.s3.ap-south-1.amazonaws.com/40bb8d860e1afe5d0da4d3eb479f4812"
            postTitle="I love this guy."
          />
          <UserPost
            likes={1200}
            replies={481}
            postTitle="This is my first thread."
          />
        </>
      )}
    </>
  );
}

export default UserPage;

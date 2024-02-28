// Components
import UserPost from "../components/UserPost";

// React-Redux
import { useSelector } from "react-redux";

// Redux Toolkit Query
import { useGetFeedPostsQuery } from "../store/store";

function HomePage() {
  const user = useSelector((state) => state.app.user);
  // Redux Toolkit Query
  const { data: posts, isLoading, isError } = useGetFeedPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred!</div>;

  return (
    <>
      {posts?.data.map((postData) => (
        <UserPost
          key={postData.post._id}
          id={postData.post._id}
          name={postData.name}
          username={postData.username}
          profilePic={postData.profilePic}
          postedBy={postData.post.postedBy}
          createdAt={postData.post.createdAt}
          media={postData.post.media}
          type={postData.post.type}
          text={postData.post.text}
          didLike={postData.post.likes.includes(user)}
          likes={postData.post.likes.length}
          replies={postData.post.replies}
        />
      ))}
    </>
  );
}

export default HomePage;

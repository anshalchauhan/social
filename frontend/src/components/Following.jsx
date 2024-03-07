// UI
import { Flex, Text, Avatar } from "@chakra-ui/react";

// React Router Dom
import { Link } from "react-router-dom";

// Redux Toolkit Query
import { useGetFollowingQuery } from "../store/store";

const Following = () => {
  //   Redux Toolkit Query
  const { data, isLoading, isError } = useGetFollowingQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occurred!</div>;

  return (
    <Flex className="scroll" direction="column" gap={4} overflowY="scroll">
      <Flex flexDirection="column" gap={4}>
        {data?.data.map((user) => (
          <Flex
            w="full"
            key={user.username}
            gap={4}
            cursor="pointer"
            as={Link}
            to={`/${user.username}`}
            alignItems="center"
          >
            <Avatar size="md" name={user.name} src={user.profilePic} />
            <Flex gap={1} flexDirection="column" alignItems="flex-start">
              <Text fontSize="sm">{user.username}</Text>
              <Text fontSize="sm" color="gray.light">
                {user.name}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Following;

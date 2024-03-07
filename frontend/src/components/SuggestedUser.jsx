// React
import { useEffect } from "react";

// UI
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

// React Router Dom
import { Link } from "react-router-dom";

// Redux Toolkit Query
import { useLazyGetUsersQuery } from "../store/store";

const SuggestedUser = () => {
  const [trigger, result] = useLazyGetUsersQuery();

  useEffect(() => {
    trigger("");
  }, [trigger]);

  return (
    <Flex className="scroll" direction="column" gap={4} overflowY="scroll">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoIosSearch size="24px" />
        </InputLeftElement>
        <Input
          placeholder="Search Users"
          aria-label="Searchbar"
          borderRadius={50}
          onChange={(e) => trigger(e.target.value)}
        />
      </InputGroup>
      <Flex flexDirection="column" gap={4}>
        {result?.data?.data.map((user) => (
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

export default SuggestedUser;

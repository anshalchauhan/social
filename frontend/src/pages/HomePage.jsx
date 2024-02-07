import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link to="/markzuckerberg">
      <Flex w={"full"} justify={"center"}>
        <Button mx={"auto"}>Visit Profile Page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;

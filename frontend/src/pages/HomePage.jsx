// UI
import { Flex, Button } from "@chakra-ui/react";

// Navigation
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Link to="/markzuckerberg">
      <Flex w="full" justify="center">
        <Button mx="auto">Visit Profile Page</Button>
      </Flex>
    </Link>
  );
}

export default HomePage;

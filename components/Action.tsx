import * as React from "react";
import { Button, HStack, Stack, Textarea } from "@chakra-ui/react";
import { constants } from "ethers";
import { useAccount } from "wagmi";
import AuthButton from "./AuthButton";
import {useSellItem} from "../hooks/useAction";

interface CommentEditorProps {
  topic: string;
}

const CommentEditor: React.FunctionComponent<CommentEditorProps> = ({
  topic,
}) => {
  const [message, setMessage] = React.useState("");
  const mutation = useSellItem();
  const [accountQuery] = useAccount();

  return (
    <Stack spacing={3}>
      <AuthButton
        size="sm"
        colorScheme="pink"
        alignSelf="flex-end"
        onClick={() => {
          console.log(1111);
        }}
        isLoading={mutation.isLoading}
      >
        Submit
      </AuthButton>
    </Stack>
  );
};

export default CommentEditor;
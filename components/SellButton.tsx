import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    ModalOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react'
import AuthButton from './AuthButton';

interface MySellModalProps {

}

const SellButton: React.FunctionComponent<MySellModalProps> = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <AuthButton onClick={() => {
                onOpen()
            }}>
                出售
            </AuthButton>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Custom backdrop filters!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default SellButton;
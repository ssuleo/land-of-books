import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Select, Input } from "@chakra-ui/react";

export const CargoModal = ({ isOpen, onClose, onSubmit, cargoOptions }) => (
  <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={"inside"}>
    <ModalOverlay />
    <ModalContent>
      <form onSubmit={onSubmit}>
        <Input type="hidden" name="type" value={cargoOptions.type} />
        <ModalHeader>Kargo bilgilerini giriniz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select mb={5} name="firma" isRequired>
            {cargoOptions.companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </Select>
          <Input
            isRequired
            name="kargoNo"
            placeholder="Kargo No"
            type="text"
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" mr={5}>
            Kaydet
          </Button>
          <Button onClick={onClose}>İptal</Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
);
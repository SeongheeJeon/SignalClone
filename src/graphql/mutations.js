/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      audio
      image
      status
      replyToMessageID
      chatroomID
      userID
      forUserID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      audio
      image
      status
      replyToMessageID
      chatroomID
      userID
      forUserID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      audio
      image
      status
      replyToMessageID
      chatroomID
      userID
      forUserID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      newMessage
      name
      imageUri
      LastMessage {
        id
        content
        audio
        image
        status
        replyToMessageID
        chatroomID
        userID
        forUserID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUser {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      newMessage
      name
      imageUri
      LastMessage {
        id
        content
        audio
        image
        status
        replyToMessageID
        chatroomID
        userID
        forUserID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUser {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      newMessage
      name
      imageUri
      LastMessage {
        id
        content
        audio
        image
        status
        replyToMessageID
        chatroomID
        userID
        forUserID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Admin {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRoomUser {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
      chatRoomAdminId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      publicKey
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      publicKey
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      status
      lastOnlineAt
      publicKey
      chatrooms {
        items {
          id
          chatRoomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessage
        name
        imageUri
        LastMessage {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUser {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessage
        name
        imageUri
        LastMessage {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUser {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      chatRoomID
      userID
      chatRoom {
        id
        newMessage
        name
        imageUri
        LastMessage {
          id
          content
          audio
          image
          status
          replyToMessageID
          chatroomID
          userID
          forUserID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Admin {
          id
          name
          imageUri
          status
          lastOnlineAt
          publicKey
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Messages {
          nextToken
          startedAt
        }
        ChatRoomUser {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
        chatRoomAdminId
      }
      user {
        id
        name
        imageUri
        status
        lastOnlineAt
        publicKey
        chatrooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

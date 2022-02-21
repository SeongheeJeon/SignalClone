/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser {
    onCreateChatRoomUser {
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
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser {
    onUpdateChatRoomUser {
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
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser {
    onDeleteChatRoomUser {
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

// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable"

export default createConsumer()

$(document).ready((function(_this) {
    return function() {
      var getChats, loadAdminChat, popupTrigger, popupWrapper, updateAdminChat, updateAdminChatrooms, updateChat;
      popupWrapper = $('.popup-wrapper');
      popupTrigger = $('.popup-trigger');
      $('.popup-head').click(function() {
        popupWrapper.addClass('collapse');
        popupTrigger.removeClass('collapse');
      });
      $('.popup-trigger').click(function() {
        popupWrapper.removeClass('collapse');
        popupTrigger.addClass('collapse');
      });
      $('#start-chat-form').on('ajax:success', function(data) {
        var chatroom;
        chatroom = data.detail[0];
        $('.chat-form').removeClass('collapse');
        $('.start-chat-wrapper').addClass('collapse');
        $('.chat-wrapper').removeClass('collapse');
        $('#chat-form #name').val(chatroom.name);
        $('#chat-form #chatroom_id').val(chatroom.id);
        getChats(chatroom.id);
        $('#start-chat-form')[0].reset();
      });
      getChats = function(id) {
        var token;
        token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
          url: 'chatrooms/' + id,
          type: 'get',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', token);
          },
          success: function(data) {}
        });
      };
      updateChat = function(data) {
        if (data.chatroom_id === parseInt($('input#chatroom_id').val())) {
          $('.chats').append("<div class=\"chat-bubble-wrapper d-block\">\n  <div class=\"chat-bubble bg-dark p-1 text-white my-1 d-inline-block\">\n    <small class=\"chat-username\">" + data.name + "</small>\n    <p class=\"m-0 chat-message\">" + data.message + "</p>\n  </div>\n</div>");
        }
      };
      $('#chat-form').on('ajax:success', function(data) {
        var chat;
        chat = data.detail[0];
        $('#chat-form')[0].reset();
      });
      loadAdminChat = function(chatArray) {
        $('.admin-chats').html("");
        $('input#chatroom_id').val(chatArray.chats[0].chatroom_id);
        $.map(chatArray.chats, function(chat) {
          $('.admin-chats').append("<div class=\"chat-bubble-wrapper d-block\">\n  <div class=\"chat-bubble bg-dark p-1 text-white my-1 d-inline-block\" style=\"min-width: 10rem;\">\n    <small class=\"chat-username\">" + chat.name + "</small>\n    <p class=\"m-0 chat-message\">" + chat.message + "</p>\n  </div>\n</div>");
        });
      };
      $('body').on('ajax:success', '.sidebar-chat', function(data) {
        var chat;
        chat = data.detail[0];
        loadAdminChat(chat);
      });
      updateAdminChat = function(chat) {
        if (chat.chatroom_id === parseInt($('input#chatroom_id').val())) {
          $('.admin-chats').append("<div class=\"chat-bubble-wrapper d-block\">\n  <div class=\"chat-bubble bg-dark p-1 text-white my-1 d-inline-block\" style=\"min-width: 10rem;\">\n    <small class=\"chat-username\">" + chat.name + "</small>\n    <p class=\"m-0 chat-message\">" + chat.message + "</p>\n  </div>\n</div>");
        }
      };
      updateAdminChatrooms = function(chatroom) {
        $('.sidebar').append("<div class=\"dashboard-sidebar-chat bg-info\">\n  <a class=\"sidebar-chat\" data-remote=\"true\" href=\"/chats/" + chatroom.id + "\">" + chatroom.email + "</a>\n</div>");
      };
      return $('#admin-chat-form').on('ajax:success', function(data) {
        var chat;
        chat = data.detail[0];
        $('#admin-chat-form')[0].reset();
      });
    };
  })(this));
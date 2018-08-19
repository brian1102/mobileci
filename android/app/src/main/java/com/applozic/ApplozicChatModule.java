package com.applozic;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AbsListView;

import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.applozic.mobicomkit.api.account.user.MobiComUserPreference;
import com.applozic.mobicomkit.api.account.user.User;
import com.applozic.mobicomkit.api.account.user.UserClientService;
import com.applozic.mobicomkit.api.account.user.UserLoginTask;
import com.applozic.mobicomkit.api.account.user.PushNotificationTask;
import com.applozic.mobicomkit.api.conversation.Message;
import com.applozic.mobicomkit.api.conversation.MobiComConversationService;
import com.applozic.mobicomkit.api.conversation.SyncCallService;
import com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService;
import com.applozic.mobicomkit.api.people.ChannelInfo;
import com.applozic.mobicomkit.broadcast.BroadcastService;
import com.applozic.mobicomkit.channel.database.ChannelDatabaseService;
import com.applozic.mobicomkit.channel.service.ChannelClientService;
import com.applozic.mobicomkit.channel.service.ChannelService;
import com.applozic.mobicomkit.contact.AppContactService;
import com.applozic.mobicomkit.feed.ChannelFeed;
import com.applozic.mobicomkit.uiwidgets.ApplozicSetting;
import com.applozic.mobicomkit.uiwidgets.conversation.ConversationUIService;
import com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity;
import com.applozic.mobicomkit.uiwidgets.conversation.activity.MobiComKitActivityInterface;
import com.applozic.mobicomkit.uiwidgets.instruction.InstructionUtil;
import com.applozic.mobicommons.people.channel.Channel;
import com.applozic.mobicommons.people.channel.ChannelUtils;
import com.applozic.mobicommons.people.contact.Contact;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.applozic.mobicomkit.api.account.register.RegisterUserClientService;
import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.facebook.react.bridge.queue.MessageQueueThread;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.applozic.mobicomkit.channel.service.ChannelService;
import com.yojee.driverapp.BuildConfig;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class ApplozicChatModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  protected SyncCallService syncCallService;

  public ApplozicChatModule(ReactApplicationContext reactContext) {
    super(reactContext);
    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return "ApplozicChat";
  }

  @ReactMethod
  public void login(final ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    final Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    UserLoginTask.TaskListener listener = new UserLoginTask.TaskListener() {
      @Override
      public void onSuccess(RegistrationResponse registrationResponse, Context context) {
        ApplozicSetting.getInstance(currentActivity).hideStartNewButton();
        ApplozicSetting.getInstance(currentActivity).hideInviteFriendsButton();
        ApplozicSetting.getInstance(currentActivity).hideProfileLogout();
        ApplozicSetting.getInstance(currentActivity).setMessageEditTextTextColor(Color.parseColor("#FFFFFFFF"));

        Log.e("YOJEE", BuildConfig.THEME);
        if (BuildConfig.THEME == "scharff") {
          ApplozicSetting.getInstance(currentActivity).setStatusBarColor("#FFff7177");
        } else if (BuildConfig.THEME == "tasman") {
          ApplozicSetting.getInstance(currentActivity).setStatusBarColor("#FF054875");
        } else if (BuildConfig.THEME == "ups") {
          ApplozicSetting.getInstance(currentActivity).setStatusBarColor("#FF301506");
        } else {
          ApplozicSetting.getInstance(currentActivity).setStatusBarColor("#FF80c939");
        }

        // After successful registration with Applozic server the callback will come
        // here
        if (MobiComUserPreference.getInstance(currentActivity).isRegistered()) {
          syncCallService = SyncCallService.getInstance(currentActivity);
          PushNotificationTask pushNotificationTask = null;

          PushNotificationTask.TaskListener listener = new PushNotificationTask.TaskListener() {
            public void onSuccess(RegistrationResponse registrationResponse) {

            }

            @Override
            public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
            }
          };
          pushNotificationTask = new PushNotificationTask(FirebaseInstanceId.getInstance().getToken(), listener,
              currentActivity);
          pushNotificationTask.execute((Void) null);
        }

        successCallback.invoke("success");
      }

      @Override
      public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
        // If any failure in registration the callback will come here
        cancelCallback.invoke("failure");

      }
    };

    User user = new User();
    user.setUserId(config.getString("userId")); // userId it can be any unique user identifier
    user.setDisplayName(config.getString("displayName")); // displayName is the name of the user which will be shown in
                                                          // chat messages
    user.setEmail(config.getString("email")); // optional
    user.setAuthenticationTypeId(User.AuthenticationType.APPLOZIC.getValue()); // User.AuthenticationType.APPLOZIC.getValue()
                                                                               // for password verification from
                                                                               // Applozic server and
                                                                               // User.AuthenticationType.CLIENT.getValue()
                                                                               // for access Token verification from
                                                                               // your server set access token as
                                                                               // password
    user.setPassword(config.getString("password")); // optional, leave it blank for testing purpose, read this if you
                                                    // want to add additional security by verifying password from your
                                                    // server
                                                    // https://www.applozic.com/docs/configuration.html#access-token-url
    user.setImageLink("");// optional,pass your image link
    new UserLoginTask(user, listener, currentActivity).execute((Void) null);
  }

  @ReactMethod
  public void openChat(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    Intent intent = new Intent(currentActivity, ConversationActivity.class);
    currentActivity.startActivity(intent);
    successCallback.invoke("openChat Successs");
  }

  @ReactMethod
  public void initiateChat(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    Intent intent = new Intent(currentActivity, ConversationActivity.class);
    if (config != null && config.hasKey("userId")) {
      intent.putExtra(ConversationUIService.USER_ID, config.getString("userId"));
    }
    if (config != null && config.hasKey("displayName")) {
      intent.putExtra(ConversationUIService.DISPLAY_NAME, config.getString("displayName")); // put it for displaying the
                                                                                            // title.
    }
    currentActivity.startActivity(intent);
  }

  @ReactMethod
  public void logoutUser(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    new UserClientService(currentActivity).logout();
    successCallback.invoke("true");
  }

  @ReactMethod
  public void contactUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }
    if (config != null && config.hasKey("userId")) {
      int contactUnreadCount = new MessageDatabaseService(currentActivity)
          .getUnreadMessageCountForContact(config.getString("userId"));
      successCallback.invoke(contactUnreadCount);
    }
  }

  @ReactMethod
  public void channelUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }
    if (config != null && config.hasKey("channelKey")) {
      int channelUnreadCount = new MessageDatabaseService(currentActivity)
          .getUnreadMessageCountForChannel(config.getInt("channelKey"));
      successCallback.invoke(channelUnreadCount);
    }
  }

  @ReactMethod
  public void latestMessageForChannel(ReadableMap config, final Callback successCallback,
      final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }
    if (config != null && config.hasKey("channelKey")) {
      List<Message> latestMessage = new MessageDatabaseService(currentActivity)
          .getLatestMessageByChannelKey(config.getInt("channelKey"));
      successCallback.invoke(createDefaultGson().toJson(latestMessage));
    } else
      cancelCallback.invoke("Empty channelKey");
  }

  @ReactMethod
  public void totalUnreadCount(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }
    if (config != null) {
      int totalUnreadCount = new MessageDatabaseService(currentActivity).getTotalUnreadCount();
      successCallback.invoke(totalUnreadCount);
    }
  }

  @ReactMethod
  public void isUserLogIn(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }
    MobiComUserPreference mobiComUserPreference = MobiComUserPreference.getInstance(currentActivity);
    successCallback.invoke(mobiComUserPreference.isLoggedIn());
  }

  @ReactMethod
  public void tokenRefresh(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();
    if (MobiComUserPreference.getInstance(currentActivity).isRegistered() && config.getString("token") != null) {
      try {
        new RegisterUserClientService(currentActivity).updatePushNotificationId(config.getString("token"));
        successCallback.invoke("tokenRefreshsuccess");
      } catch (Exception e) {
        e.printStackTrace();

      }

    } else {
      cancelCallback.invoke("token is zero in ref token");
    }
  }

  public static Gson createDefaultGson() {
    GsonBuilder builder = new GsonBuilder().registerTypeAdapter(Contact.class, new ContactSerializer())
        .serializeNulls();
    return builder.create();
  }

  @ReactMethod
  public void messageList(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    HashMap<String, Message> map = new HashMap<>();

    String searchString = config.getString("searchString");

    List<Message> messages = syncCallService.getLatestMessagesGroupByPeople(searchString);
    List<Message> messages1;

    if (messages.size() > 0) {
      do {
        messages1 = syncCallService.getLatestMessagesGroupByPeople(messages.get(messages.size() - 1).getCreatedAtTime(),
            searchString);
        messages.addAll(messages1);
      } while (messages1.size() != 0);
    }

    List<Message> latestMessages = new ArrayList<>();

    for (Message message : messages) {
      if (message.getGroupId() != null) {
        Message oldMessage = map.get("group-" + message.getGroupId());
        if (oldMessage == null) {
          latestMessages.add(message);
          map.put("group-" + message.getGroupId(), message);
        } else {
          if (message.getCreatedAtTime() > oldMessage.getCreatedAtTime()) {
            latestMessages.remove(oldMessage);
            latestMessages.add(message);
            map.put("group-" + message.getGroupId(), message);
          }
        }
      } else {
        Message oldMessage = map.get(message.getContactIds());
        if (oldMessage == null) {
          latestMessages.add(message);
          map.put(message.getContactIds(), message);
        } else {
          if (message.getCreatedAtTime() > oldMessage.getCreatedAtTime()) {
            latestMessages.remove(oldMessage);
            latestMessages.add(message);
            map.put(message.getContactIds(), message);
          }
        }
      }
    }
    successCallback.invoke(createDefaultGson().toJson(latestMessages));
  }

  public static class ContactSerializer implements JsonSerializer<Contact> {
    @Override
    public JsonElement serialize(Contact src, Type typeOfSrc, JsonSerializationContext context) {
      return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJsonTree(src);
    }
  }

  @ReactMethod
  public void getChannelByChannelKey(ReadableMap config, final Callback successCallback,
      final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    Integer channelKey = config.getInt("channelKey");
    Channel channel = ChannelDatabaseService.getInstance(currentActivity).getChannelByChannelKey(channelKey);
    successCallback.invoke(createDefaultGson().toJson(channel));
  }

  @ReactMethod
  public void getChannelByClientGroupId(ReadableMap config, final Callback successCallback,
      final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    String clientGroupId = config.getString("clientGroupId");
    ChannelService channelService = ChannelService.getInstance(currentActivity);
    Channel channel = channelService.getChannelByClientGroupId(clientGroupId);
    if (channel == null) {
      ChannelFeed channelInfo = ChannelClientService.getInstance(currentActivity).getChannelInfo(clientGroupId);
      if (channelInfo == null) {
        successCallback.invoke(createDefaultGson().toJson(null));
      } else {
        Channel channel1 = channelService.getChannel(channelInfo);
        String response = "{" + "\"channelKey\":" + channel1.getKey() + "," + "\"name\":\"" + channel1.getName() + "\""
            + "}";
        successCallback.invoke(response);
      }
    } else {
      String response = "{" + "\"channelKey\":" + channel.getKey() + "," + "\"name\":\"" + channel.getName() + "\""
          + "}";
      successCallback.invoke(response);
    }
  }

  @ReactMethod
  public void openChatRoom(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    if (config.hasKey("userId")) {
      Intent intent = new Intent(currentActivity, ConversationActivity.class);
      intent.putExtra(ConversationUIService.USER_ID, config.getString("userId"));
      intent.putExtra(ConversationUIService.TAKE_ORDER, true);
      currentActivity.startActivity(intent);
    } else if (config.hasKey("channelKey")) {
      Intent intent = new Intent(currentActivity, ConversationActivity.class);
      intent.putExtra(ConversationUIService.TAKE_ORDER, true);
      intent.putExtra(ConversationUIService.GROUP_ID, config.getInt("channelKey"));
      currentActivity.startActivity(intent);
    }

    successCallback.invoke("success");
  }

  @ReactMethod
  public void getDisplayName(ReadableMap config, final Callback successCallback, final Callback cancelCallback) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cancelCallback.invoke("Activity doesn't exist");
      return;
    }

    String key = config.getString("key");
    String displayName = "";

    List<String> items = null;
    List<String> userIds = null;

    Message message = new MessageDatabaseService(currentActivity).getMessage(key);
    Channel channel = ChannelDatabaseService.getInstance(currentActivity).getChannelByChannelKey(message.getGroupId());
    AppContactService appContactService = new AppContactService(currentActivity);

    if (channel == null && message.getGroupId() == null) {
      items = Arrays.asList(message.getTo().split("\\s*,\\s*"));
      if (!TextUtils.isEmpty(message.getContactIds())) {
        userIds = Arrays.asList(message.getContactIds().split("\\s*,\\s*"));
      }
    }

    Contact contactReceiver = appContactService.getContactReceiver(items, userIds);

    if (contactReceiver != null) {
      String contactInfo = contactReceiver.getDisplayName();
      if (items.size() > 1) {
        Contact contact2 = appContactService.getContactById(items.get(1));
        contactInfo = TextUtils.isEmpty(contactReceiver.getFirstName()) ? contactReceiver.getContactNumber()
            : contactReceiver.getFirstName() + ", "
                + (TextUtils.isEmpty(contact2.getFirstName()) ? contact2.getContactNumber() : contact2.getFirstName())
                + (items.size() > 2 ? " & others" : "");
      }
      displayName = contactInfo;
    }
    if (channel != null && message.getGroupId() != null) {
      if (Channel.GroupType.GROUPOFTWO.getValue().equals(channel.getType())) {
        Contact withUserContact = appContactService
            .getContactById(ChannelService.getInstance(currentActivity).getGroupOfTwoReceiverUserId(channel.getKey()));
        if (withUserContact != null) {
          displayName = withUserContact.getDisplayName();
        }
      } else {
        displayName = ChannelUtils.getChannelTitleName(channel,
            MobiComUserPreference.getInstance(currentActivity).getUserId());
      }
    }

    successCallback.invoke(displayName);
  }

  @Override
  public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent intent) {
  }

  @Override
  public void onNewIntent(Intent intent) {
  }

}

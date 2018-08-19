//
//  ApplozicChat.m
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import "YJDChatManager.h"
#import "ApplozicChat.h"

#if __has_include("ALChannelDBService.h")
  #import "ALChannelDBService.h"
#else
  #import "Applozic/ALChannelDBService.h"
#endif

#if __has_include("ALChannelService.h")
#import "ALChannelService.h"
#else
#import "Applozic/ALChannelService.h"
#endif

#if __has_include("ALMessageDBService.h")
#import "ALMessageDBService.h"
#else
#import "Applozic/ALMessageDBService.h"
#endif

#if __has_include("ALContactDBService.h")
#import "ALContactDBService.h"
#else
#import "Applozic/ALContactDBService.h"
#endif

#if __has_include("ALUserDefaultsHandler.h")
#import "ALUserDefaultsHandler.h"
#else
#import "Applozic/ALUserDefaultsHandler.h"
#endif


#import <React/RCTLog.h>
#import "YJDGetMessagesOperation.h"
#import "YJDChatLauncher.h"

@interface NSString (YJEISEmpty)
- (BOOL)isEmpty;
@end

@implementation NSString (YJEISEmpty)
- (BOOL)isEmpty {
    return [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]].length == 0;
}
@end

@interface ApplozicChat ()

@property(nonnull, retain, readonly) YJDChatManager *chatManager;
@property(nonnull, retain, readonly) ALChannelService *channelService;
@property(nonnull, retain, readonly) ALChannelDBService *channelDBService;
@property(nonnull, retain, readonly) NSOperationQueue *operationQueue;
@property(nonnull, retain, readonly) ALMessageDBService *messageDBService;
@property(nonnull, retain, readonly) ALContactDBService *contactDBService;
@property(nonnull, retain, readonly) YJDChatLauncher *chatLauncher;
@property(nonnull, retain, readwrite) ALUser* user;

@end

@implementation ApplozicChat

- (instancetype)init {
    self = [super init];
    if (self) {
        _chatManager = [YJDChatManager new];
        _channelDBService = [ALChannelDBService new];
        _channelService = [ALChannelService new];
        _operationQueue = [NSOperationQueue new];
        _operationQueue.maxConcurrentOperationCount = 1;
        _messageDBService = [ALMessageDBService new];
        _contactDBService = [ALContactDBService new];
        _chatLauncher = [YJDChatLauncher new];
    }
    return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(channelUnreadCount:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSNumber *channelKey = config[@"channelKey"];
    RCTLog(@"channelUnreadCount: %@ ", channelKey);

    NSNumber *count = [[self.channelDBService getChannelByKey:channelKey] unreadCount];
    successCallback(@[count]);
}

RCT_EXPORT_METHOD(contactUnreadCount:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSString *userId = config[@"userId"];
    RCTLog(@"contactUnreadCount: %@ ", userId);

    NSInteger count = [self.messageDBService getMessagesCountFromDBForUser:userId];
    successCallback(@[@(count)]);
}

RCT_EXPORT_METHOD(getChannelByChannelKey:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSNumber *channelKey = config[@"channelKey"];
    RCTLog(@"getChannelByChannelKey: %@ ", channelKey);

    ALChannel *channel = [self.channelDBService loadChannelByKey:channelKey];
    if (!channel) {
        return successCallback(@[@"null"]);
    }
    NSDictionary *jsonDic = [channel dictionary];
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    //RCTLog(@"getChannelByChannelKey jsonString: %@ ", jsonString);
    successCallback(@[jsonString]);
}

RCT_EXPORT_METHOD(getChannelByClientGroupId:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSString *clientGroupId = config[@"clientGroupId"];
    ALChannel *channel = [self.channelDBService loadChannelByClientChannelKey:clientGroupId];
    if (!channel) {
      [self.chatManager registerUserWithCompletion:self.user withHandler:^(ALRegistrationResponse *rResponse, NSError *error) {
        if (!error) {
          RCTLog(@"Applozic registration was successful");
         [self.channelService getChannelInformation:nil orClientChannelKey:clientGroupId withCompletion:^(ALChannel *c3) {
           if (!c3) {
             return successCallback(@[@"null"]);
           }
           NSDictionary *jsonDic = @{@"channelKey": c3.key};
           NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
           NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
           
           RCTLog(@"getChannelByClientGroupId1: %@ ", jsonString);

           successCallback(@[jsonString]);
          }];
        } else {
          RCTLog(@"Error in Applozic registration : %@", error.description);
          cancelCallback(error);
        }
      }];
    } else {
      NSDictionary *jsonDic = @{@"channelKey": channel.key};
      NSData *jsonData = [NSJSONSerialization dataWithJSONObject:jsonDic options:NSJSONWritingPrettyPrinted error:nil];
      NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
      RCTLog(@"getChannelByClientGroupId2: %@ ", jsonString);

      successCallback(@[jsonString]);
    }
  
}

RCT_EXPORT_METHOD(getDisplayName:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSString *key = config[@"key"];
    RCTLog(@"getDisplayName: %@ ", key);

    NSString *displayName = @"";
    DB_Message *dbMessage = (DB_Message *) [self.messageDBService getMessageByKey:@"key" value:key];
    ALMessage *message = [self.messageDBService createMessageEntity:dbMessage];
    ALChannel *channel = [self.channelDBService loadChannelByKey:message.groupId];

    NSArray *items = nil;
    NSArray *userIds = nil;

    if (channel == nil && message.groupId == nil) {
        items = [message.to componentsSeparatedByString:@","];
        if (![message.contactIds isEmpty]) {
            userIds = [message.contactIds componentsSeparatedByString:@","];
        }
    }

    ALContact *contactReceiver = [self.contactDBService loadContactByKey:@"userId" value:items[0]];
    if (contactReceiver) {
        NSString *contactInfo = contactReceiver.displayName;
        if (items.count > 1) {
            ALContact *contact2 = [self.contactDBService loadContactByKey:@"userId" value:items[1]];
            contactInfo = [contactReceiver.fullName isEmpty] ? contactReceiver.contactNumber : contactReceiver.fullName;
            contactInfo = [NSString stringWithFormat:@"%@ %@", contactInfo, [contact2.fullName isEmpty] ? contact2.contactNumber : contact2.fullName];
            if (items.count > 2) {
                contactInfo = [NSString stringWithFormat:@"%@ %@", contactInfo, @" & others"];
            }
        }
        displayName = contactInfo;
    }

    if (channel != nil && message.groupId != nil) {
        if (channel.type == GROUP_OF_TWO) {
            NSString *receiverID = [channel getReceiverIdInGroupOfTwo];
            ALContact *withUserContact = [self.contactDBService loadContactByKey:@"userId" value:receiverID];

            if (withUserContact != nil) {
                displayName = withUserContact.displayName;
            }
        } else {
            displayName = [channel name];
        }
    }
  
  if (!displayName) {
    displayName = contactReceiver.displayName;
  }

    RCTLog(@"RESULT getDisplayName: %@ ", displayName);
    if (!displayName) {
      successCallback(@[@"null"]);
    } else {
      successCallback(@[displayName]);
    }
}

RCT_EXPORT_METHOD(login:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback
) {
    // RCTLog(@"login: %@, %@, %@ ", config, successCallback, cancelCallback);

    self.user = [[ALUser alloc] init];
    [self.user setUserId:config[@"userId"]];
    [self.user setDisplayName:config[@"displayName"]];
    [self.user setEmail:config[@"email"]];
    [self.user setPassword:config[@"password"]];
    [self.user setAuthenticationTypeId:(short) APPLOZIC];
    [self.user setApplicationId:APPLICATION_ID];

    [self.chatManager registerUserWithCompletion:self.user withHandler:^(ALRegistrationResponse *rResponse, NSError *error) {
        if (!error) {
            RCTLog(@"Applozic registration was successful");
            successCallback(@[]);
        } else {
            RCTLog(@"Error in Applozic registration : %@", error.description);
          if (ALUserDefaultsHandler.getApnDeviceToken && !ALUserDefaultsHandler.getApnDeviceToken.isEmpty) {
            
            [self.chatLauncher registerForNotification];
          }
            cancelCallback(error);
        }
    }];
}

RCT_EXPORT_METHOD(messageList:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    RCTLog(@"messageList: %@, %@, %@ ", config, successCallback, cancelCallback);
    YJDGetMessagesOperation *operation = [YJDGetMessagesOperation operationWith:self.messageDBService successCallback:successCallback cancelCallback:cancelCallback];
    [self.operationQueue addOperation:operation];
}


RCT_EXPORT_METHOD(openChatRoom:
    (NSDictionary *) config
            successCallback:
            (RCTResponseSenderBlock) successCallback
            cancelCallback:
            (RCTResponseErrorBlock) cancelCallback) {
    NSString *userId = config[@"userId"];
    NSNumber *channelKey = config[@"channelKey"];

    RCTLog(@"openChatRoom: %@ ", userId);

    if (userId) {
        [self.chatLauncher launchIndividualChat:userId withGroupId:nil andWithText:nil];
    } else if (channelKey) {
        [self.chatLauncher launchIndividualChat:nil withGroupId:channelKey andWithText:nil];
    }

    successCallback(@[@"success"]);
}

@end

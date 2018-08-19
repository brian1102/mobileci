//
//  YJDChatLauncher.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

#if __has_include("ALConversationProxy.h")
#import "ALConversationProxy.h"
#else
#import "Applozic/ALConversationProxy.h"
#endif

#if __has_include("ALMessage.h")
#import "ALMessage.h"
#else
#import "Applozic/ALMessage.h"
#endif

#if __has_include("ALChatLauncher.h")
#import "ALChatLauncher.h"
#else
#import "Applozic/ALChatLauncher.h"
#endif

@interface YJDChatLauncher : ALChatLauncher

-(void)launchIndividualChat:(NSString *)userId withGroupId:(NSNumber*)groupID andWithText:(NSString *)text;

@end

//
//  YJDChatLauncher.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <Applozic/ALConversationProxy.h>
#import <Applozic/ALMessage.h>
#import <Applozic/ALChatLauncher.h>

@interface YJDChatLauncher : ALChatLauncher

-(void)launchIndividualChat:(NSString *)userId withGroupId:(NSNumber*)groupID andWithText:(NSString *)text;

@end

//
//  YJDChatManager.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


#if __has_include("ALChatLauncher.h")
#import "ALChatLauncher.h"
#else
#import "Applozic/ALChatLauncher.h"
#endif


#if __has_include("ALUser.h")
#import "ALUser.h"
#else
#import "Applozic/ALUser.h"
#endif


#if __has_include("ALConversationService.h")
#import "ALConversationService.h"
#else
#import "Applozic/ALConversationService.h"
#endif

#if __has_include("ALRegisterUserClientService.h")
#import "ALRegisterUserClientService.h"
#else
#import "Applozic/ALRegisterUserClientService.h"
#endif


#define APPLICATION_ID @"3089269a45e761555a64ad342cd7ac69a"

@interface YJDChatManager : NSObject

@property (nonatomic, strong) ALChatLauncher * chatLauncher;

-(instancetype)initWithApplicationKey:(NSString *)applicationKey;
-(void)registerUserWithCompletion:(ALUser *)alUser withHandler:(void(^)(ALRegistrationResponse *rResponse, NSError *error))completion;
-(NSString *)getApplicationKey;

@end

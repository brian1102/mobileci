//
//  YJDChatManager.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Applozic/ALChatLauncher.h>
#import <Applozic/ALUser.h>
#import <Applozic/ALConversationService.h>
#import <Applozic/ALRegisterUserClientService.h>

@interface YJDChatManager : NSObject

@property (nonatomic, strong) ALChatLauncher * chatLauncher;

-(instancetype)initWithApplicationKey:(NSString *)applicationKey;
-(void)registerUserWithCompletion:(ALUser *)alUser withHandler:(void(^)(ALRegistrationResponse *rResponse, NSError *error))completion;
-(NSString *)getApplicationKey;

@end

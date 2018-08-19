//
//  YJDGetMessagesOperation.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <Applozic/ALMessageDBService.h>

@interface YJDGetMessagesOperation : NSOperation <ALMessagesDelegate>

+ (instancetype)operationWith:(ALMessageDBService *)dbService
              successCallback:(RCTResponseSenderBlock)successCallback
               cancelCallback:(RCTResponseErrorBlock)cancelCallback;

@end

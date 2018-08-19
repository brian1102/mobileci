//
//  YJDGetMessagesOperation.h
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


#if __has_include("ALMessageDBService.h")
#import "ALMessageDBService.h"
#else
#import "Applozic/ALMessageDBService.h"
#endif



@interface YJDGetMessagesOperation : NSOperation <ALMessagesDelegate>

+ (instancetype)operationWith:(ALMessageDBService *)dbService
              successCallback:(RCTResponseSenderBlock)successCallback
               cancelCallback:(RCTResponseErrorBlock)cancelCallback;

@end

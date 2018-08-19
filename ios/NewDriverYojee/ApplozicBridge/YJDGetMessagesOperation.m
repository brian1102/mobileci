//
//  YJDGetMessagesOperation.m
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import "YJDGetMessagesOperation.h"
#import <React/RCTLog.h>

typedef NS_ENUM(NSInteger, State) {
    Ready,
    Executing,
    Finished
};

@interface YJDGetMessagesOperation ()

@property(nonatomic, assign) NSInteger state;
@property(nonatomic, weak, readwrite) ALMessageDBService *dbService;
@property(nonatomic, copy, readwrite) RCTResponseSenderBlock successCallback;
@property(nonatomic, copy, readwrite) RCTResponseErrorBlock cancelCallback;

@end

@implementation YJDGetMessagesOperation

+ (instancetype)operationWith:(ALMessageDBService *)dbService
              successCallback:(RCTResponseSenderBlock)successCallback
               cancelCallback:(RCTResponseErrorBlock)cancelCallback {
    return [[YJDGetMessagesOperation alloc] initWith:dbService successCallback:successCallback cancelCallback:cancelCallback];
}

- (instancetype)initWith:(ALMessageDBService *)dbService
         successCallback:(RCTResponseSenderBlock)successCallback
          cancelCallback:(RCTResponseErrorBlock)cancelCallback {
    self = [super init];
    if (self) {
        _state = Ready;
        _dbService = dbService;
        _successCallback = successCallback;
        _cancelCallback = cancelCallback;
    }
    return self;
}

- (BOOL)isAsynchronous {
    return true;
}

- (BOOL)isExecuting {
    return self.state == Executing;
}

- (BOOL)isFinished {
    return self.state == Finished;
}

- (void)setState:(NSInteger)nextState {
    [self willChangeValueForKey:@"state"];
    _state = nextState;
    [self didChangeValueForKey:@"state"];
}

- (void)start {
    if (self.isCancelled) {
        self.state = Finished;
    } else {
        self.state = Ready;
        [self main];
    }
}

- (void)main {
    if (self.isCancelled) {
        self.state = Finished;
    } else {
        self.state = Executing;
    }

    ALMessageDBService *dBService = [ALMessageDBService new];
    dBService.delegate = self;
    [dBService getMessages:nil];

}

#pragma mark - ALMessagesDelegate

- (void)getMessagesArray:(NSMutableArray *)messagesArray {
    if (self.isCancelled) {
        self.cancelCallback([NSError errorWithDomain:@"" code:-1000 userInfo:@{}]);
    } else {
        NSArray *messages = [messagesArray valueForKey:@"dictionary"];
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:messages options:NSJSONWritingPrettyPrinted error:nil];
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        self.successCallback(@[jsonString]);
    }
    self.state = Finished;
}

- (void)updateMessageList:(NSMutableArray *)messagesArray {
    RCTLog(@"updateMessageList: %@", messagesArray);
}

@end

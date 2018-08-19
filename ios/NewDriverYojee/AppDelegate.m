/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLog.h>
#import <Applozic/ALChatViewController.h>
#import "RNFIRMessaging.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <Applozic/ALUserDefaultsHandler.h>
#import <Applozic/ALRegisterUserClientService.h>
#import <Applozic/ALRegistrationResponse.h>
#import <Applozic/ALPushNotificationService.h>
#import <Applozic/ALDBHandler.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  NSURL *jsCodeLocation;
  
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"NewDriverYojee"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  _navigationController = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  self.navigationController.navigationBarHidden = YES;
  self.navigationController.delegate = self;
  self.window.rootViewController = self.navigationController;
  [self.window makeKeyAndVisible];
  
  [Fabric with:@[[Crashlytics class]]];
  return YES;
}

- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)
deviceToken {
  
  const unsigned *tokenBytes = [deviceToken bytes];
  NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                        ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                        ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                        ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
  
  NSString *apnDeviceToken = hexToken;
  NSLog(@"apnDeviceToken: %@", hexToken);
  
  if (![[ALUserDefaultsHandler getApnDeviceToken] isEqualToString:apnDeviceToken]) {
    ALRegisterUserClientService *registerUserClientService = [[ALRegisterUserClientService alloc] init];
    [registerUserClientService updateApnDeviceTokenWithCompletion
     :apnDeviceToken withCompletion:^(ALRegistrationResponse
                                      *rResponse, NSError *error) {
       
       if (error) {
         NSLog(@"%@",error);
         return;
       }
       NSLog(@"Registration response%@", rResponse);
     }];
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}

#if defined(__IPHONE_11_0)
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#else
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler
{
    [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#endif

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RNFIRMessaging didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication*)application didReceiveRemoteNotification:(NSDictionary*)dictionary {
  
  NSLog(@"Received notification WithoutCompletion: %@", dictionary);
  ALPushNotificationService *pushNotificationService = [[ALPushNotificationService alloc] init];
  [pushNotificationService notificationArrivedToApplication:application withDictionary:dictionary];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  ALPushNotificationService *pushNotificationService = [[ALPushNotificationService alloc] init];
  [pushNotificationService notificationArrivedToApplication:application withDictionary:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  
  ALRegisterUserClientService *registerUserClientService = [[ALRegisterUserClientService alloc] init];
  [registerUserClientService disconnect];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"APP_ENTER_IN_BACKGROUND" object:nil];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  
  ALRegisterUserClientService *registerUserClientService = [[ALRegisterUserClientService alloc] init];
  [registerUserClientService connect];
  [ALPushNotificationService applicationEntersForeground];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"APP_ENTER_IN_FOREGROUND" object:nil];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [[ALDBHandler sharedInstance] saveContext];
}

#pragma mark - UINavigationControllerDelegate

- (nullable id <UIViewControllerAnimatedTransitioning>)navigationController:(UINavigationController *)navigationController
                                            animationControllerForOperation:(UINavigationControllerOperation)operation
                                                         fromViewController:(UIViewController *)fromVC
                                                           toViewController:(UIViewController *)toVC  {
  RCTLog(@"From: %@, to: %@, operation: %ld", fromVC, toVC, (long)operation);
  
  if ([fromVC isMemberOfClass:[ALChatViewController class]] && operation == UINavigationControllerOperationPop) {
    [self.navigationController setNavigationBarHidden:YES animated:YES];
  }
  
  if ([toVC isMemberOfClass:[ALChatViewController class]] && operation == UINavigationControllerOperationPush) {
    [self.navigationController setNavigationBarHidden:NO animated:YES];
  }
  return nil;
}

@end

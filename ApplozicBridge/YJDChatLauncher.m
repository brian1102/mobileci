//
//  YJDChatLauncher.m
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import "YJDChatLauncher.h"
#import "AppDelegate.h"


#if __has_include("ALApplozicSettings.h")
#import "ALApplozicSettings.h"
#else
#import "Applozic/ALApplozicSettings.h"
#endif


#if __has_include("ALChatViewController.h")
#import "ALChatViewController.h"
#else
#import "Applozic/ALChatViewController.h"
#endif


#if __has_include("ALMessagesViewController.h")
#import "ALMessagesViewController.h"
#else
#import "Applozic/ALMessagesViewController.h"
#endif

#import <React/RCTLog.h>

@interface YJDChatLauncher () <ALChatViewControllerDelegate, ALMessagesViewDelegate>
@end

@implementation YJDChatLauncher

- (UINavigationController *)createNavigationControllerForVC:(UIViewController *)vc {
    NSString *className = [ALApplozicSettings getCustomNavigationControllerClassName];
    if (![className isKindOfClass:[NSString class]]) className = @"UINavigationController";
    UINavigationController *navC = [(UINavigationController *) [NSClassFromString(className) alloc] initWithRootViewController:vc];
    return navC;
}

- (void)launchIndividualChat:(NSString *)userId withGroupId:(NSNumber *)groupID
     andWithText:(NSString *)text {

    if (groupID) {
        [self launchIndividualChatForGroup:userId withGroupId:groupID withDisplayName:nil andWithText:text];
    } else {
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Applozic" bundle:[NSBundle bundleForClass:ALChatViewController.class]];

        ALChatViewController *chatViewController = [storyboard instantiateViewControllerWithIdentifier:@"ALChatViewController"];
        chatViewController.channelKey = groupID;
        chatViewController.contactIds = userId;
        chatViewController.text = text;
        chatViewController.individualLaunch = YES;
        chatViewController.chatViewDelegate = self;

        dispatch_async(dispatch_get_main_queue(), ^{
            [self.navigationController pushViewController:chatViewController animated:YES];
        });
    }
}

- (UINavigationController *)navigationController {
    UIApplication *application = [UIApplication sharedApplication];
    AppDelegate *delegate = (AppDelegate *)[application delegate];
    return delegate.navigationController;
}

- (void)launchIndividualChatForGroup:(NSString *)userId withGroupId:(NSNumber *)groupID
                     withDisplayName:(NSString *)displayName
             andWithText:(NSString *)text {

    ALChannelService *channelService = [ALChannelService new];
    [channelService getChannelInformation:groupID orClientChannelKey:nil withCompletion:^(ALChannel *alChannel) {
        UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Applozic"
                                                             bundle:[NSBundle bundleForClass:ALChatViewController.class]];

        ALChatViewController *chatViewController = [storyboard instantiateViewControllerWithIdentifier:@"ALChatViewController"];

        chatViewController.channelKey = groupID;
        chatViewController.text = text;
        chatViewController.contactIds = userId;
        chatViewController.individualLaunch = YES;
        chatViewController.displayName = displayName;
        chatViewController.chatViewDelegate = self;

        dispatch_async(dispatch_get_main_queue(), ^{
            [self.navigationController pushViewController:chatViewController animated:YES];
        });
    }];
}

- (void)handleCustomActionFromMsgVC:(UIViewController *)chatView andWithMessage:(ALMessage *)alMessage {
    id launcherDelegate = NSClassFromString([ALApplozicSettings getCustomClassName]);
    [launcherDelegate handleCustomAction:chatView andWithMessage:alMessage];
}

- (void)handleCustomActionFromChatVC:(UIViewController *)chatViewController andWithMessage:(ALMessage *)alMessage {
    id launcherDelegate = NSClassFromString([ALApplozicSettings getCustomClassName]);
    [launcherDelegate handleCustomAction:chatViewController andWithMessage:alMessage];
}

@end

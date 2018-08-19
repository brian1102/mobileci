//
//  YJDChatManager.m
//  DriveYojee
//
//  Created by Viktor Belenyesi on 2017. 08. 30.
//  Copyright © 2017. Facebook. All rights reserved.
//

#import "YJDChatManager.h"

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


@implementation YJDChatManager

- (instancetype)init {
    return [self initWithApplicationKey:APPLICATION_ID];
}

- (instancetype)initWithApplicationKey:(NSString *)applicationKey; {
    self = [super init];
    if (self) {
        [ALUserDefaultsHandler setApplicationKey:applicationKey];
    }
    return self;
}


- (NSString *)getApplicationKey {
    NSString *appKey = [ALUserDefaultsHandler getApplicationKey];
    NSLog(@"APPLICATION_KEY :: %@", appKey);
    return appKey ? appKey : APPLICATION_ID;
}

- (void)registerUserWithCompletion:(ALUser *)alUser withHandler:(void (^)(ALRegistrationResponse *rResponse, NSError *error))completion {
    self.chatLauncher = [[ALChatLauncher alloc] initWithApplicationId:[self getApplicationKey]];


    [self ALDefaultChatViewSettings];
    [alUser setApplicationId:[self getApplicationKey]];
    [alUser setAppModuleName:[ALUserDefaultsHandler getAppModuleName]];

    ALRegisterUserClientService *registerUserClientService = [[ALRegisterUserClientService alloc] init];
    [registerUserClientService initWithCompletion:alUser withCompletion:^(ALRegistrationResponse *rResponse, NSError *error) {

        NSLog(@"USER_REGISTRATION_RESPONSE :: %@", rResponse);
        if (error) {
            NSLog(@"ERROR_USER_REGISTRATION :: %@", error.description);
            [ALUtilityClass showAlertMessage:rResponse.message andTitle:@"Response"];
            completion(nil, error);
            return;
        }

        if (![rResponse isRegisteredSuccessfully]) {
            [ALUtilityClass showAlertMessage:rResponse.message andTitle:@"ALERT!!!"];
            NSError *passError = [NSError errorWithDomain:rResponse.message code:0 userInfo:nil];
            completion(nil, passError);
            return;
        }

        if (![[UIApplication sharedApplication] isRegisteredForRemoteNotifications]) {
            [self.chatLauncher registerForNotification];
        }

        completion(rResponse, error);
    }];
}

//==============================================================================================================================================
// This method helps you customise various settings
//==============================================================================================================================================

- (void)ALDefaultChatViewSettings {

    /*********************************************  NAVIGATION SETTINGS  ********************************************/

    [ALApplozicSettings setStatusBarBGColor:[UIColor colorWithRed:(CGFloat) (128.0 / 255) green:(CGFloat) (201.0 / 255) blue:(CGFloat) (57 / 255) alpha:1]];
    [ALApplozicSettings setStatusBarStyle:UIStatusBarStyleLightContent];

    [ALApplozicSettings setColorForNavigation:[UIColor colorWithRed:(CGFloat) (128.0 / 255) green:(CGFloat) (201.0 / 255) blue:(CGFloat) (57 / 255) alpha:1]];
    [ALApplozicSettings setColorForNavigationItem:[UIColor whiteColor]];
    [ALApplozicSettings hideRefreshButton:YES];
    [ALUserDefaultsHandler setNavigationRightButtonHidden:YES];
    [ALUserDefaultsHandler setBottomTabBarHidden:NO];
    [ALApplozicSettings setTitleForConversationScreen:@"Chats"];
    [ALApplozicSettings setCustomNavRightButtonMsgVC:NO];                   /*  SET VISIBILITY FOR REFRESH BUTTON (COMES FROM TOP IN MSG VC)   */
    [ALApplozicSettings setTitleForBackButtonMsgVC:@""];                /*  SET BACK BUTTON FOR MSG VC  */
    [ALApplozicSettings setTitleForBackButtonChatVC:@""];               /*  SET BACK BUTTON FOR CHAT VC */
    /****************************************************************************************************************/


    /***************************************  SEND RECEIVE MESSAGES SETTINGS  ***************************************/

    [ALApplozicSettings setSendMsgTextColor:[UIColor whiteColor]];
    [ALApplozicSettings setColorForSendMessages:[UIColor colorWithRed:54 green:134 blue:231 alpha:1]];
    [ALApplozicSettings setReceiveMsgTextColor:[UIColor grayColor]];
    [ALApplozicSettings setColorForReceiveMessages:[UIColor colorWithRed:255 / 255 green:255 / 255 blue:255 / 255 alpha:1]];
    [ALApplozicSettings setColorForSendMessages:[UIColor colorWithRed:(CGFloat) (66.0 / 255) green:(CGFloat) (173.0 / 255) blue:(CGFloat) (247.0 / 255) alpha:1]];

    [ALApplozicSettings setCustomMessageBackgroundColor:[UIColor lightGrayColor]];              /*  SET CUSTOM MESSAGE COLOR */
    [ALApplozicSettings setCustomMessageFontSize:14];                                     /*  SET CUSTOM MESSAGE FONT SIZE */
    [ALApplozicSettings setCustomMessageFont:@"Helvetica"];

    //****************** DATE COLOUR : AT THE BOTTOM OF MESSAGE BUBBLE ******************/
    [ALApplozicSettings setDateColor:[UIColor colorWithRed:(CGFloat) (51.0 / 255) green:(CGFloat) (51.0 / 255) blue:(CGFloat) (51.0 / 255) alpha:0.5]];

    //****************** MESSAGE SEPERATE DATE COLOUR : DATE MESSAGE ******************/
    [ALApplozicSettings setMsgDateColor:[UIColor blackColor]];

    /***************  SEND MESSAGE ABUSE CHECK  ******************/

    [ALApplozicSettings setAbuseWarningText:@"AVOID USE OF ABUSE WORDS"];
    [ALApplozicSettings setMessageAbuseMode:YES];

    //****************** SHOW/HIDE RECEIVER USER PROFILE ******************/
    [ALApplozicSettings setReceiverUserProfileOption:NO];

    /****************************************************************************************************************/


    /**********************************************  IMAGE SETTINGS  ************************************************/

    [ALApplozicSettings setMaxCompressionFactor:0.1f];
    [ALApplozicSettings setMaxImageSizeForUploadInMB:3];
    [ALApplozicSettings setMultipleAttachmentMaxLimit:5];
    /****************************************************************************************************************/


    /**********************************************  GROUP SETTINGS  ************************************************/

    [ALApplozicSettings setGroupOption:YES];
    [ALApplozicSettings setGroupInfoDisabled:NO];
    [ALApplozicSettings setGroupInfoEditDisabled:NO];


    [ALApplozicSettings setGroupExitOption:YES];
    [ALApplozicSettings setGroupMemberAddOption:YES];
    [ALApplozicSettings setGroupMemberRemoveOption:YES];


    /****************************************************************************************************************/


    /******************************************** NOTIIFCATION SETTINGS  ********************************************/


    if ([ALUtilityClass isThisDebugBuild]) {
        [ALUserDefaultsHandler setDeviceApnsType:(short) DEVELOPMENT];
    } else {
        [ALUserDefaultsHandler setDeviceApnsType:(short) DISTRIBUTION];
    }

    NSString *appName = [[NSBundle mainBundle] infoDictionary][@"CFBundleName"];
    [ALApplozicSettings setNotificationTitle:appName];

    [ALApplozicSettings enableNotification]; //0
    //    [ALApplozicSettings disableNotification]; //2
    //    [ALApplozicSettings disableNotificationSound]; //1                /*  IF NOTIFICATION SOUND NOT NEEDED  */
    //    [ALApplozicSettings enableNotificationSound];//0                   /*  IF NOTIFICATION SOUND NEEDED    */
    /****************************************************************************************************************/


    /********************************************* CHAT VIEW SETTINGS  **********************************************/

    [ALApplozicSettings setVisibilityForNoMoreConversationMsgVC:NO];        /*  SET VISIBILITY NO MORE CONVERSATION (COMES FROM TOP IN MSG VC)  */
    [ALApplozicSettings setEmptyConversationText:@"You have no conversations yet"]; /*  SET TEXT FOR EMPTY CONVERSATION    */
    [ALApplozicSettings setVisibilityForOnlineIndicator:YES];               /*  SET VISIBILITY FOR ONLINE INDICATOR */
    UIColor *sendButtonColor = [UIColor colorWithRed:(CGFloat) (66.0 / 255) green:(CGFloat) (173.0 / 255) blue:(CGFloat) (247.0 / 255) alpha:0]; /*  SET COLOR FOR SEND BUTTON   */
    [ALApplozicSettings setColorForSendButton:sendButtonColor];
  // Hau Vo: set background for bottom bar control
    [ALApplozicSettings setColorForTypeMsgBackground:[UIColor colorWithRed: (CGFloat)(45.0/255) green: (CGFloat)(58.0/255) blue:(CGFloat)(76.0/255) alpha:1.0]];     /*  SET COLOR FOR TYPE MESSAGE OUTER VIEW */
    [ALApplozicSettings setMsgTextViewBGColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0]];        /*  SET BG COLOR FOR MESSAGE TEXT VIEW */
    [ALApplozicSettings setPlaceHolderColor:[UIColor grayColor]];               /*  SET COLOR FOR PLACEHOLDER TEXT */
    [ALApplozicSettings setVisibilityNoConversationLabelChatVC:YES];            /*  SET NO CONVERSATION LABEL IN CHAT VC    */
    [ALApplozicSettings setBGColorForTypingLabel:[UIColor colorWithRed:(CGFloat) (242 / 255.0) green:(CGFloat) (242 / 255.0) blue:(CGFloat) (242 / 255.0) alpha:0]]; /*  SET COLOR FOR TYPING LABEL  */
    [ALApplozicSettings setTextColorForTypingLabel:[UIColor colorWithRed:(CGFloat) (51.0 / 255) green:(CGFloat) (51.0 / 255) blue:(CGFloat) (51.0 / 255) alpha:0.5]]; /*  SET COLOR FOR TEXT TYPING LABEL  */
    /****************************************************************************************************************/


    /********************************************** CHAT TYPE SETTINGS  *********************************************/

    [ALApplozicSettings setContextualChat:YES];                                 /*  IF CONTEXTUAL NEEDED    */
    /*  Note: Please uncomment below setter to use app_module_name */
    //   [ALUserDefaultsHandler setAppModuleName:@"<APP_MODULE_NAME>"];
    //   [ALUserDefaultsHandler setAppModuleName:@"SELLER"];
    /****************************************************************************************************************/


    /*********************************************** CONTACT SETTINGS  **********************************************/

    [ALApplozicSettings setFilterContactsStatus:YES];                           /*  IF NEEDED ALL REGISTERED CONTACTS   */
    [ALApplozicSettings setOnlineContactLimit:0];                               /*  IF NEEDED ONLINE USERS WITH LIMIT   */

    [ALApplozicSettings setSubGroupLaunchFlag:NO];                             /*  IF NEEDED ONLINE USERS WITH LIMIT   */
    /****************************************************************************************************************/


    /***************************************** TOAST + CALL OPTION SETTINGS  ****************************************/

    [ALApplozicSettings setColorForToastText:[UIColor blackColor]];         /*  SET COLOR FOR TOAST TEXT    */
    [ALApplozicSettings setColorForToastBackground:[UIColor grayColor]];    /*  SET COLOR FOR TOAST BG      */
    [ALApplozicSettings setCallOption:YES];
    /****************************************************************************************************************/


    /********************************************* DEMAND/MISC SETTINGS  ********************************************/

    [ALApplozicSettings setUnreadCountLabelBGColor:[UIColor purpleColor]];
    [ALApplozicSettings setCustomClassName:@"YJDChatManager"];                   /*  SET 3rd Party Class Name OR YJDChatManager */
    [ALUserDefaultsHandler setFetchConversationPageSize:20];                    /*  SET MESSAGE LIST PAGE SIZE  */ // DEFAULT VALUE 20
    [ALUserDefaultsHandler setUnreadCountType:1];                               /*  SET UNRAED COUNT TYPE   */ // DEFAULT VALUE 0
    [ALApplozicSettings setMaxTextViewLines:4];
    [ALUserDefaultsHandler setDebugLogsRequire:YES];                            /*   ENABLE / DISABLE LOGS   */
    [ALUserDefaultsHandler setLoginUserConatactVisibility:NO];
    [ALApplozicSettings setUserProfileHidden:NO];
    [ALApplozicSettings setFontFace:@"Helvetica"];
    [ALApplozicSettings setChatWallpaperImageName:@"<WALLPAPER NAME>"];
    /****************************************************************************************************************/


    /***************************************** APPLICATION URL CONFIGURATION + ENCRYPTION  ***************************************/

    //    [self getApplicationBaseURL];                                         /* Note: PLEASE DO NOT COMMENT THIS IF ARCHIVING/RELEASING  */

    [ALUserDefaultsHandler setEnableEncryption:NO];                            /* Note: PLEASE DO YES (IF NEEDED)  */
    /****************************************************************************************************************/

    [ALUserDefaultsHandler setGoogleMapAPIKey:@"AIzaSyBnWMTGs1uTFuf8fqQtsmLk-vsWM7OrIXk"]; //REPLACE WITH YOUR GOOGLE MAPKEY

    //    NSMutableArray * array = [NSMutableArray new];
    //    [array addObject:[NSNumber numberWithInt:1]];
    //    [array addObject:[NSNumber numberWithInt:2]];
    //
    //    [ALApplozicSettings setContactTypeToFilter: array];         // SET ARRAY TO PREFERENCE

    /************************************** 3rd PARTY VIEWS + MSg CONTAINER SETTINGS  *************************************/

    //    NSArray * viewArray = @[@"VC1", @"VC2"];    // VC : ViewController's Class Name
    //    [self.permissableVCList arrayByAddingObject:@""];

    //    [ALApplozicSettings setMsgContainerVC:@""];  // ADD CLASS NAME
    /**********************************************************************************************************************/

    [ALApplozicSettings setUserDeletedText:@"User has been deleted"];            /*  SET DELETED USER NOTIFICATION TITLE   */


    /******************************************** CUSTOM TAB BAR ITEM : ICON && TEXT ************************************************/
    [ALApplozicSettings setChatListTabIcon:@""];
    [ALApplozicSettings setProfileTabIcon:@""];

    [ALApplozicSettings setChatListTabTitle:@""];
    [ALApplozicSettings setProfileTabTitle:@""];
}

@end

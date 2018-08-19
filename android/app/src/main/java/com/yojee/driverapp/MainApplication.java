package com.yojee.driverapp;

import android.app.Application;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactlibrary.androidsettings.RNANAndroidSettingsLibraryPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.applozic.ApplozicChatPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

import android.support.multidex.MultiDexApplication;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeConfigPackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new RNVersionNumberPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSoundPackage(),
            new RSSignatureCapturePackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new RNFetchBlobPackage(),
            new FIRMessagingPackage(),
            new RNCardViewPackage(),
            new RCTCameraPackage(),
            new RNANAndroidSettingsLibraryPackage(),
            new LocationServicesDialogBoxPackage(),
            new ReactNativeFingerprintScannerPackage(),
            new ApplozicChatPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // MultiDex.install(this);
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}

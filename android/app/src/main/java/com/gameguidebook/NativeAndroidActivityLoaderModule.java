package  com.gameguidebook;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class NativeAndroidActivityLoaderModule extends ReactContextBaseJavaModule {

  public NativeAndroidActivityLoaderModule(ReactApplicationContext reactContext) {
      super(reactContext);
    }

  @Override
  public String getName() {
      return "NativeAndroidActivityLoader";
  }

  @Override
  public boolean canOverrideExistingModule() {
          return true;
  }

  @ReactMethod
  public void startActivityByString(String activityName){
          try {
              Activity currentActivity = getCurrentActivity();
              if (null != currentActivity) {

                         Class aimActivity = Class.forName(activityName);
                  Intent intent = new Intent(currentActivity,aimActivity);
                  currentActivity.startActivity(intent);
              }
          } catch (Exception e) {

          }
      }
}

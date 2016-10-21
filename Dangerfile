puts "Running fastlane to generate and upload an ipa file..."

options = {
  xcodebuild: {
      workspace: "ios/Simple Golfstats.xcodeproj/project.xcworkspace",
      scheme: "Golftracker"
    }
}

require 'fastlane'
result = Fastlane::OneOff.run(action: "build_and_upload_to_appetize",
                          parameters: options)

device_grid.run(
  public_key: result,
  languages: ["en", "sv"],
  devices: ["iphone5s", "iphone6splus"]
)

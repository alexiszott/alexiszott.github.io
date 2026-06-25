# Python script to patch missing lines 921-979 using current Timeline.jsx lines 702-804

reconstructed_path = "/Users/alexiszott/.gemini/antigravity-cli/brain/17d5ce8c-0c76-4c68-9541-34607b864bbc/scratch/reconstructed_timeline.jsx"
current_timeline_path = "/Users/alexiszott/Documents/Dev/portfolio/alexiszott.github.io/src/components/Timeline.jsx"

with open(reconstructed_path, "r", encoding="utf-8") as f:
    reconstructed_lines = f.readlines()

with open(current_timeline_path, "r", encoding="utf-8") as f:
    current_lines = f.readlines()

patched_section = current_lines[701:804]

start_idx = -1
end_idx = -1

for idx, line in enumerate(reconstructed_lines):
    if "MISSING LINE 921" in line:
        start_idx = idx
    if "MISSING LINE 979" in line:
        end_idx = idx
        break

if start_idx != -1 and end_idx != -1:
    print(f"Replacing lines {start_idx} to {end_idx} in reconstructed file with patched section.")
    new_lines = reconstructed_lines[:start_idx] + patched_section + reconstructed_lines[end_idx+1:]
    
    with open(current_timeline_path, "w", encoding="utf-8") as out:
        out.writelines(new_lines)
    print(f"Successfully patched! Overwrote {current_timeline_path}")
else:
    print("Could not find placeholders.")

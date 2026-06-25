reconstructed_path = "/Users/alexiszott/.gemini/antigravity-cli/brain/17d5ce8c-0c76-4c68-9541-34607b864bbc/scratch/reconstructed_timeline.jsx"
current_timeline_path = "/Users/alexiszott/Documents/Dev/portfolio/alexiszott.github.io/src/components/Timeline.jsx"

# Read the reconstructed lines (first 640 lines, which represent lines 1 to 640)
with open(reconstructed_path, "r", encoding="utf-8") as f:
    reconstructed_lines = f.readlines()

reconstructed_mobile_part = reconstructed_lines[:640]

# Read the current Timeline.jsx to extract the desktop part
with open(current_timeline_path, "r", encoding="utf-8") as f:
    current_lines = f.readlines()

# Find where the desktop timeline starts
desktop_start_idx = -1
for idx, line in enumerate(current_lines):
    if "/* 2. DESKTOP TIMELINE" in line:
        desktop_start_idx = idx
        break

if desktop_start_idx != -1:
    print(f"Found DESKTOP timeline start at line {desktop_start_idx} in current Timeline.jsx.")
    desktop_part = current_lines[desktop_start_idx:]
    
    # Merge parts
    final_lines = reconstructed_mobile_part + desktop_part
    
    # Overwrite Timeline.jsx
    with open(current_timeline_path, "w", encoding="utf-8") as out:
        out.writelines(final_lines)
    print(f"Successfully restored and merged original Timeline.jsx! Overwrote {current_timeline_path}")
else:
    print("Could not find the DESKTOP timeline start comment in the current file.")

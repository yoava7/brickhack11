import torch
import open_clip
from PIL import Image
import json
import os
import sys

# Load CLIP Model
model = open_clip.create_model("ViT-L-14", pretrained="openai")
preprocess = open_clip.image_transform(model.visual.image_size, is_train=False)
tokenizer = open_clip.get_tokenizer("ViT-L-14")

# Load attributes and slots from JSON file
json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'clothingAttributes.json')
with open(json_path, 'r') as f:
    data = json.load(f)

attributes = data['attributes']
slots = data['slots']

def get_clothing_attributes(image_path):
    """Identify multiple attributes of clothing from an image file path using CLIP."""
    try:
        img = Image.open(image_path).convert("RGB")
        img_tensor = preprocess(img).unsqueeze(0)

        with torch.no_grad():
            img_features = model.encode_image(img_tensor)
            img_features /= img_features.norm(dim=-1, keepdim=True)

        def find_best_match(options):
            text_tokens = tokenizer(options)
            with torch.no_grad():
                text_features = model.encode_text(text_tokens)
                text_features /= text_features.norm(dim=-1, keepdim=True)
            similarity = (img_features @ text_features.T).squeeze(0)
            best_idx = similarity.argmax().item()
            return options[best_idx]

        return {
            "color": find_best_match(attributes["colors"]),
            "type": find_best_match(attributes["types"]),
            "material": find_best_match(attributes["materials"]),
            "pattern": find_best_match(attributes["patterns"]),
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    try:
        # The file path is passed as a command-line argument
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No image file path provided"}))
            sys.exit(1)

        image_path = sys.argv[1]  # Get the image file path from the argument
        attributes = get_clothing_attributes(image_path)

        if "error" in attributes:
            # If error, print the error message
            print(json.dumps({"error": attributes["error"]}))
        else:
            print(json.dumps(attributes))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

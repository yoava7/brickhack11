import torch
import open_clip
from PIL import Image
import sys
import json

# Load CLIP Model
model = open_clip.create_model("ViT-L-14", pretrained="openai")
preprocess = open_clip.image_transform(model.visual.image_size, is_train=False)
tokenizer = open_clip.get_tokenizer("ViT-L-14")

# Attribute categories
colors = ["red", "blue", "green", "black", "white", "yellow"]
types = ["t-shirt", "jacket", "pants", "dress", "sweater"]
materials = ["cotton", "denim", "leather", "wool", "silk"]
patterns = ["solid", "striped", "floral", "plaid"]

def get_clothing_attributes(image_path):
    """Identify multiple attributes of clothing from a local image file using CLIP."""
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
        "color": find_best_match(colors),
        "type": find_best_match(types),
        "material": find_best_match(materials),
        "pattern": find_best_match(patterns),
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image file provided"}))
        sys.exit(1)

    image_path = sys.argv[1]
    attributes = get_clothing_attributes(image_path)
    print(json.dumps(attributes))

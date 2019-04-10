def is_unique(model, key, value):
    return model.query.filter(getattr(model, key) == value).first() is None
